import { View, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { withTheme, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BookHomeButton from "../../components/buttons/BookHomeButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  theme: any;
  navigation: any;
}

const BookShopHome: React.FC<props> = ({ theme, navigation }) => {
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

  useEffect(() => {
    const fetchData = async () => {
      const shop = await AsyncStorage.getItem("shopData");
      if (shop) {
        const parsedShop = JSON.parse(shop);
        alert(`${parsedShop.bookshop_id}  ${parsedShop.shopkeeper_id}`);
        // Handle parsedShop
      } else {
        alert("shop data couldn't be fetched");
      }
    };
    fetchData()
  }, []);

  return (
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
          navigation={navigation}
          theme={theme}
          handleButton={() => {
            navigation?.navigate("Scanner");
          }}
        ></BookHomeButton>
        <BookHomeButton
          title="View Catalogue"
          navigation={navigation}
          theme={theme}
          handleButton={() => {
            navigation.navigate("BookShopCatalog");
          }}
        ></BookHomeButton>
      </View>
    </View>
  );
};

export default withTheme(BookShopHome);
