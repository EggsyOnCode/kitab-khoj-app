import { View, Text } from 'react-native'
import {Button} from "react-native-paper"
import React from 'react'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";




GoogleSignin.configure({
    webClientId:
    "730590305822-hmqgcjgabn4heg094nilmjli35devi1u.apps.googleusercontent.com",
});


function GoogleSignIn({theme}: {theme:any}) {
    async function onGoogleButtonPress() {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      }).catch((err) => {
        alert(err);
      });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      alert(idToken);
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
        onGoogleButtonPress().then(() => console.log("Signed in with Google!")).catch((err)=>{alert(err)})
      }
    >
      Google Sign In
    </Button>
  );
}

export default GoogleSignIn