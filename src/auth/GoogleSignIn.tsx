import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { firebase } from "@react-native-firebase/auth";
import axios from "axios";

GoogleSignin.configure({
  webClientId:
    "730590305822-hmqgcjgabn4heg094nilmjli35devi1u.apps.googleusercontent.com",
});

interface props {
  theme: any;
  navigation: any;
}

const GoogleSignIn: React.FC<props> = ({ theme, navigation }) => {
  const getEmail = () => {
    const user = firebase.auth().currentUser;
    return user?.email?.toString();
  };

  const checkRoleDB = async (email: string) => {
    // const payload = {
    //   email: email,
    // };

    // console.log("user's email is ", payload.email);
    try {
      const shopRes = await axios.get(
        `http://10.7.82.109:3000/v1/shopkeeper/access?email=${email}`
      );

      if (!shopRes.data.data.result) {
        console.log("not a shopkeeper");
        try {
          console.log("cus checking emaiil is ", email);
          
          const cusRes = await axios.get(
            `http://10.7.82.109:3000/v1/Customer/access?email=${email}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!cusRes.data.data.result) {
            console.log("not a customer");
          } else {
            console.log("is a customer");
            navigation.navigate("CustomerHomeNav");
          }
        } catch (cusErr) {
          console.error("Error checking customer access:", cusErr);
        }
      } else {
        console.log("is a shopkeeper");
        navigation.navigate("BookShopHome");
      }
    } catch (shopErr) {
      console.error("Error checking shopkeeper access:", shopErr);
      alert("Error checking shopkeeper access");
    }
  };
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    }).catch((err) => {
      alert(err);
    });

    // Get the users ID token
    const { idToken, user } = await GoogleSignin.signIn();
    checkRoleDB(user.email);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      style={{
        marginTop: 18,
        paddingVertical: 8,
        backgroundColor: theme.colors.sec2,
      }}
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log("Signed in with Google!"))
          .catch((err) => {
            alert(err);
          })
      }
    >
      Google Sign In
    </Button>
  );
};

export default GoogleSignIn;
