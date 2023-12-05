import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import LoginScreen from "./src/screens/auth/Login";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#001524",
    secondary: "#D6CC99",
    black: "#000000",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <LoginScreen theme={theme}/>
    </PaperProvider>
  );
}
