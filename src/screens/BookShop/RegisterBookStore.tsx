import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Avatar, withTheme, Text } from "react-native-paper";

interface props {
  theme: any;
  navigation: any;
}

const RegisterBookStore: React.FC<props> = ({ theme, navigation }) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: theme.colors.primary,
          padding: 20,
          flex: 1,
          paddingTop: 60,
        },
        button: {
          paddingVertical: 8,
          width: "50%",
          backgroundColor: theme.colors.secondary,
          marginBottom: 12,
        },
        title: {
          marginBottom: 20,
          color: theme.colors.sec2,
          textAlign: "center",
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Business
      </Text>
      <Text variant="displaySmall" style={styles.title}>
        OnRamping
      </Text>

      
    </View>
  );
};

export default withTheme(RegisterBookStore);
