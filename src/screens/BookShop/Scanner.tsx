import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Avatar, withTheme, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { manipulateAsync } from "expo-image-manipulator";

const api_key = Config.OCR_API;

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

const ScannerScreen: React.FC<ScannerScreenProps> = ({ theme, navigation }) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
        },
        button: {
          marginTop: 15,
          paddingVertical: 8,
          width: "50%",
          backgroundColor: theme.colors.secondary,
          marginBottom: 12,
        },
        title: {
          marginBottom: 30,
          color: theme.colors.sec2,
        },
      }),
    [theme]
  );

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [image, setImage] = useState<any>();
  const [text, setText] = useState<string>();

  // Load images on startup
  useEffect(() => {}, []);

  const apiCall = async (img: any) => {
    const api_key = "AIzaSyDTpcRPc-44RydvSTDu6Oh8lrSuw2vSE_Q";
    // const options = {
    //   headers: {
    //     apikey: api_key,
    //   },
    //   params: {
    //     base64Image: img,
    //     filetype: "jpg",
    //   },
    // };

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

    const res = await axios.post(apiUrl, reqData);
    console.log(res.data.responses[0].fullTextAnnotation.text);
  };

  const launchCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        base64: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        await apiCall(result.assets[0].base64);
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Add a Book
      </Text>
      <Avatar.Icon
        icon="camera"
        style={{ backgroundColor: "transparent" }}
        size={150}
        color={theme.colors.accent}
      />
      <Button
        mode="contained"
        onPress={() => launchCamera()}
        style={styles.button}
        icon="camera"
        labelStyle={{ fontSize: 20, color: theme.colors.black }}
        contentStyle={{ flexDirection: "row-reverse" }}
        uppercase={false}
      >
        Scan
      </Button>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            height: windowHeight * 0.4,
            width: windowWidth * 0.8,
            borderWidth: 1,
            borderRadius: 11,
          }}
        />
      )}
      {}
    </View>
  );
};

export default withTheme(ScannerScreen);
