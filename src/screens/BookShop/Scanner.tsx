import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Avatar, withTheme, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {Dimensions} from 'react-native';


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

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string>();

  // Load images on startup
  useEffect(() => {}, []);


  // // Select image from library or camera
  // const selectImage = async (useLibrary: boolean) => {
  //   let result;
  //   const options: ImagePicker.ImagePickerOptions = {
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 0.75,
  //   };

  //   if (useLibrary) {
  //     result = await ImagePicker.launchImageLibraryAsync(options);
  //   } else {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //     result = await ImagePicker.launchCameraAsync(options);
  //   }

  //   // Save image if not cancelled
  //   if (!result.canceled) {
  //     saveImage(result.assets[0].uri);
  //   }
  // };


  const launchCamera = async ()=>{
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1
      });
      if(!result.canceled){
        console.log(result.assets[0].uri);
        setImage(result.assets[0].uri);
      }

    } catch (error) {
      
    }
  }

  // Render image list item

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
      {image && <Image source={{uri: image}} style={{height: windowHeight*0.4, width: windowWidth * 0.8, borderWidth: 1, borderRadius: 11}}/>}
    </View>
  );
};

export default withTheme(ScannerScreen);
