import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { withTheme, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BookHomeButton from "../../components/buttons/BookHome";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props{
    theme: any,
    nav: any
}

const BookShopHome:React.FC<props> = ({theme, nav}) => {
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
        <View style={{ justifyContent: "center" }}>
          <BookHomeButton
            title="Add a Book"
            navigation={nav}
            theme={theme}
            handleButton={() => {}}
          ></BookHomeButton>
          <BookHomeButton
            title="View Catalogue"
            navigation={nav}
            theme={theme}
            handleButton={() => {}}
          ></BookHomeButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(BookShopHome);
