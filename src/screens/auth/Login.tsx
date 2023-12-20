import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  KeyboardAvoidingViewBase,
} from "react-native";
import { TextInput, Button, Text, withTheme } from "react-native-paper";
import auth, { firebase } from "@react-native-firebase/auth";
import GoogleSignIn from "../../auth/GoogleSignIn";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { authStore } from "../../utils/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Role } from "../../types/const/data";

interface LoginScreenProps {
  theme: any;
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ theme, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSignIn = () => {
    console.log(email, password);
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(async () => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };


  const checkRoleDB = async (email: any) => {
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
 
  const handleLoginIn = () => {
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((user) => {
        console.log("User account logged in!", user);
        checkRoleDB(user.user.email)
      })
      .catch((error) => {
        console.log(error.code);
        console.error(error);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: theme.colors.primary,
    },
    input: {
      color: theme.colors.black,
      marginBottom: 10,
      borderColor: theme.colors.placeholder,
    },
    button: {
      marginTop: 10,
      paddingVertical: 8,
      fontSize: 18,
      backgroundColor: theme.colors.secondary,
    },
    register: {
      marginTop: 18,
      paddingVertical: 8,
      fontSize: 18,
      backgroundColor: theme.colors.sec2,
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 56,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          variant="displayLarge"
          style={{
            color: theme.colors.sec2,
            alignContent: "center",
            marginBottom: 6,
          }}
        >
          Kitab Khoj
        </Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text
          variant="displaySmall"
          style={{
            color: "#ffffff",
            alignContent: "center",
            marginBottom: 6,
          }}
        >
          Login
        </Text>
      </View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={handleLoginIn}
        style={styles.button}
        textColor="black"
      >
        Login
      </Button>

      <Button
        mode="contained"
        onPress={handleSignIn}
        style={styles.register}
        textColor="black"
      >
        Register
      </Button>
      <GoogleSignIn theme={theme} navigation={navigation} />
    </View>
  );
};

export default withTheme(LoginScreen);
