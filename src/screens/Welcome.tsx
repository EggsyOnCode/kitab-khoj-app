import * as React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Provider as PaperProvider,
  withTheme,
  Text,
} from "react-native-paper";

const WelcomeScreen = ({ theme }) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
        },
        title: {
          marginBottom: 30,
          color: theme.colors.sec2,
        },
        buttonsContainer: {
          height: "auto",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
        },
        button: {
          marginTop: 15,
          paddingVertical: 8,
          width: "90%",
          backgroundColor: theme.colors.secondary,
          marginBottom: 6,
        },
        labelStyle: {
            fontSize: 20
        }
      }),
    [theme]
  );

  const handleBookshopRegister = () => {
    // Handle bookshop registration logic
    console.log("Register as Bookshop");
  };

  const handleCustomerRegister = () => {
    // Handle customer registration logic
    console.log("Register as Customer");
  };

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.title}>
        Kitab Khoj
      </Text>
      <View style={styles.buttonsContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Register As
        </Text>
        <Button
          mode="contained"
          onPress={handleBookshopRegister}
          style={styles.button}
          textColor="black"
          labelStyle={styles.labelStyle}
        >
        Bookshop
        </Button>
        <Button
          mode="contained"
          onPress={handleCustomerRegister}
          style={styles.button}
          textColor="black"
          labelStyle={styles.labelStyle}
        >
          Customer
        </Button>
      </View>
    </View>
  );
};

export default withTheme(WelcomeScreen);
