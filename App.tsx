import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import LoginScreen from "./src/screens/auth/Login";
import Welcome from "./src/screens/Welcome";
import StackNavigator from "./src/nav/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./src/nav/DrawerNav";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#001524",
    secondary: "#D6CC99",
    sec2: "#FDE5D4",
    black: "#000000",
    purple: "#6750A4",
    green: "#D9D9D9",
    card: "#F3EDF7",
    darkPurple: "#211F26",
    red: "#7E2721",
    white: "#FFFFFF",
    textInput: "#E6E0E9",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.black }}>
          <StatusBar backgroundColor={theme.colors.secondary} />
          <DrawerNav theme={theme} />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}
