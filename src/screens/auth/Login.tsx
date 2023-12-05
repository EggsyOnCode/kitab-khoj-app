import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, withTheme } from "react-native-paper";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "../../utils/firebase";

interface LoginScreenProps {
  theme: any;
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ theme, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = firebase_auth

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("logged in", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error in logging", error);
        
      });
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Successful", userCredential);
      navigation.navigate("Welcome");
    } catch (error) {
      console.log("Error Code == ", error);
    }
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
          style={{ color: "#ffffff", alignContent: "center", marginBottom: 6 }}
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
        onPress={handleLogin}
        style={styles.button}
        textColor="black"
      >
        Login
      </Button>

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.register}
        textColor="black"
      >
        Register
      </Button>
    </View>
  );
};

export default withTheme(LoginScreen);
