import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button, Avatar, withTheme, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";
import axios from "axios";
import Config from "react-native-config";
import mime from "mime";
// const api_key = Config.OCR_API;
const api_key = "AIzaSyDTpcRPc-44RydvSTDu6Oh8lrSuw2vSE_Q";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Credentials } from "@aws-sdk/types";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { RNS3 } from "react-native-aws3";

interface ScannerScreenProps {
  theme: any;
  navigation: any;
}

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

const Scanner: React.FC<ScannerScreenProps> = ({ theme, navigation }) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
          padding: 20,
          flex: 1,
          paddingTop: 60,
        },
        button: {
          paddingVertical: 8,
          width: "50%",
          backgroundColor: theme.colors.secondary,
          marginBottom: 12,
        },
        title: {
          marginBottom: 20,
          color: theme.colors.sec2,
          textAlign: "center",
        },
      }),
    [theme]
  );

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [image, setImage] = useState<any>();
  const [imageBase64, setImageBase64] = useState<any>();
  const [words, setWords] = useState<string | null>(null);
  const [proc, setProc] = useState<boolean>(false);

  const [title, setTitle] = useState("as you like it");
  const [author, setauthor] = useState("");
  const [iban, setiban] = useState("9780557015894");
  const [imgType, setImgType] = useState<any | undefined>("");
  const [photo, setPhoto] = useState<any>();
  const [imageLink, setImageLink] = useState<any>();

  const checkForDuplicate = async (title: string) => {
    const res = await axios.get(
      `http://127.0.0.1:3000/v1/book?searchQuery=${title}`
    );

    if (res.data.data.result.length != 0) {
      alert("Book already exists");
      setTitle(res.data.data.result[0].title);
      setauthor(res.data.data.result[0].author);
      setiban(res.data.data.result[0].iban);

      return true;
    }
    return false;
  };

  useEffect(() => {
    if (words) {
      const arrayOfStrings = words?.split("\n");
      const fetchBookAttr = async () => {
        try {
          const res = await axios.get(
            `http://10.7.82.109:5000/process_text?txt=${arrayOfStrings}`
          );
          // Handle the response
          console.log(res.data);
          console.log("author: ", res.data.author);
          setTitle(res.data.title);
          setauthor(res.data.author);
          setiban(res.data.iban);

          await checkForDuplicate(title);
        } catch (error) {
          // Handle error
          console.error("Error:", error);
        }
      };
      fetchBookAttr();
    }
  }, [words]);

  const apiCall = async (img: any) => {
    setProc(true);
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${api_key}`;
    const reqData = {
      requests: [
        {
          image: {
            content: img,
          },
          features: [{ type: "TEXT_DETECTION" }],
        },
      ],
    };

    const res:any = await axios.post(apiUrl, reqData);
    setTitle(res?.book)
    setiban(res?.isbn);
    setauthor(res?.author);

    setWords(res.data.responses[0].fullTextAnnotation.text);
    setProc(false);
  };

  const launchCamera = async () => {
    try {
      console.log("scanner ...");

      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        base64: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        let filename: any = uri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // const formData: any = new FormData();
        // formData.append("file", {
        //   uri: uri,
        //   name: uri?.split("/")?.pop(),
        //   type: "image/jpeg",
        // });
        // // formData.append("type", type);

        // setPhoto(formData);

        setImage(result.assets[0].uri);
        setImgType(result.assets[0].type);
        setImageBase64(result.assets[0].base64);
        await apiCall(result.assets[0].base64);
        console.log("uploading to cloud....");

        await AWSHelper.uploadFile(uri);
      }
    } catch (error) {}
  };

  const options = {
    keyPrefix: "uploads/",
    bucket: "flexiwork-bucket",
    region: "us-east-1",
    successActionStatus: 201,
  };

  let credentials: Credentials = {
    accessKeyId: "AKIARPRISAUITNDP2XVI",
    secretAccessKey: "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",
  };
  const client = new S3Client({
    region: options.region,
    credentials: credentials,
  });
  const AWSHelper = {
    uploadFile: async function (imageURI: any) {
      try {
        const file: any = {
          uri: imageURI,
          name: `${imageURI}.jpeg`,
          type: "image/jpeg",
        };

        await client
          .send(
            new PutObjectCommand({
              Bucket: "flexiwork-bucket",
              Key: "uploads/" + file.name,
              Body: file,
            })
          )
          .then((response) => {
            const link = `https://flexiwork-bucket.s3.amazonaws.com/uploads/${imageURI}`;
            setImageLink(link);
            console.log(response.$metadata);
          })
          .catch((error) => {
            console.log(error);
          });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text variant="displayMedium" style={styles.title}>
          Add a Book
        </Text>
        <Avatar.Icon
          icon="camera"
          style={{ backgroundColor: "transparent", marginTop: 10 }}
          size={150}
          color={theme.colors.accent}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => {
          launchCamera();
        }}
        style={styles.button}
        icon="camera"
        labelStyle={{ fontSize: 20, color: theme.colors.black }}
        contentStyle={{ flexDirection: "row-reverse" }}
        uppercase={false}
      >
        Scan
      </Button>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: "center" }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                height: windowHeight * 0.4,
                width: windowWidth * 0.8,
                borderWidth: 1,
                borderRadius: 11,
                marginTop: 20,
                marginBottom: 20, // Adjust the margin as needed
              }}
            />
          )}
          {/* <Button
            style={styles.button}
            onPress={() => {
              console.log(imageLink);
              navigation.navigate("BookAttributes", {
                screen: "BookAttributes",
                theme: theme,
                navigation: navigation,
                pTitle: "Diplomacy",
                pAuthor: "Henry issinger",
                pIban: "9824",
                link: imageLink,
              });
            }}
          >
            Update
          </Button> */}
          {!proc ? (
            words && (
              <View style={{ padding: 20 }}>
                <Text style={{ color: "red", marginBottom: 6 }}>{words}</Text>
                <Button
                  style={styles.button}
                  onPress={() => {
                    console.log(imageLink);
                    navigation.navigate("BookAttributes", {
                      screen: "BookAttributes",
                      theme: theme,
                      navigation: navigation,
                      pTitle: title,
                      pAuthor: author,
                      pIban: iban,
                      link: imageLink,
                    });
                  }}
                >
                  <Text variant="headlineSmall">Update</Text>
                </Button>
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                padding: 20,
              }}
            >
              <ActivityIndicator size="large" color="blue" />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default withTheme(Scanner);
