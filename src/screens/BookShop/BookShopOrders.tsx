import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { Avatar, Button, Icon, Text , withTheme} from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  theme: any;
  navigation: any;
}
const BookShopOrders: React.FC<props> = ({
  theme,
  navigation,
}) => {
    const styles = React.useMemo(
      () =>
        StyleSheet.create({
          container: {
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: theme.colors.primary,
            padding: 20,
            flexGrow: 1,
            paddingRight: 2,
            paddingTop: 60,
          },
          button: {
            paddingVertical: 8,
            width: windowWidth * 0.92,
            borderRadius: 11,
            backgroundColor: theme.colors.secondary,
            marginVertical: 30,
          },
          rampContainer: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.green,
            padding: 20,
            borderRadius: 11,
          },
          title: {
            marginBottom: 20,
            color: theme.colors.sec2,
            textAlign: "center",
          },
          title2: {
            marginBottom: 20,
            color: theme.colors.sec2,
            textAlign: "center",
            marginTop: 30,
          },
          input: {
            width: windowWidth * 0.8,
            marginBottom: 20,
          },
        }),
      [theme]
    );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Manage Your
        </Text>
        <Text variant="headlineLarge" style={styles.title}>
          Book Repository
        </Text>
        
      </View>
    </SafeAreaView>
  );
};

export default withTheme(BookShopOrders);
