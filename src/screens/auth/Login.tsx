import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Provider as PaperProvider,
  withTheme,
  Text,
  MD3Colors,
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
          color: "#000000",
          marginBottom: 10,
          borderColor: theme.colors.placeholder,
          // Additional dynamic styles based on theme
        },
        button: {
          marginTop: 10,
          paddingVertical: 8,
          backgroundColor: theme.colors.secondary,
          // Additional dynamic styles based on theme
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={{ color: "#ffffff" , alignContent: "center", marginBottom: 6}}>
        Kitab Khoj
      </Text>
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
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

export default withTheme(LoginScreen);
