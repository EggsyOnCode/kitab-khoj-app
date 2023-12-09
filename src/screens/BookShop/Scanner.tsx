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
import { manipulateAsync } from "expo-image-manipulator";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [words, setWords] = useState<string | null>(null);
  const [proc, setProc] = useState<boolean>(false);
  useEffect(() => {
    console.log(words?.toString());
  }, [words]);

  const apiCall = async (img: any) => {
    setProc(true);
    const api_key = "AIzaSyDTpcRPc-44RydvSTDu6Oh8lrSuw2vSE_Q";

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

    setWords(res.data.responses[0].fullTextAnnotation.text);
    setProc(false);
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
        onPress={() => launchCamera()}
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
          {!proc ? (
            words && (
              <View style={{padding:20}}>
                <Text style={{ color: "red", marginBottom: 6 }}>
                  {words}
                </Text>
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

export default withTheme(ScannerScreen);
