import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  Provider as PaperProvider,
  withTheme,
  Text,
} from "react-native-paper";

const LoginScreen = ({ theme }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
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
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 56 }}>
        <Text
          variant="displayMedium"
          style={{ color: "#ffffff", alignContent: "center", marginBottom: 6 }}
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
        onPress={handleLogin}
        style={styles.register}
        textColor="black"
      >
        Register
      </Button>
      
    </View>
  );
};

export default withTheme(LoginScreen);
