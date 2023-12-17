import { View, StyleSheet, Dimensions, SafeAreaView, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Icon,
  Searchbar,
  Text,
  withTheme,
} from "react-native-paper";
import { books } from "../../types/const/data";
import CatalogCard from "../../components/CatalogCard";
import { Book } from "../../types/Book";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  theme: any;
  navigation: any;
  books: Book[];
}
const BookShopCatalog: React.FC<props> = ({ theme, navigation }) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: theme.colors.primary,
          padding: 20,
          flexGrow: 1,
          flex:1,
          paddingTop: 60,
        },
        button: {
          paddingVertical: 8,
          width: windowWidth * 0.92,
          borderRadius: 11,
          backgroundColor: theme.colors.secondary,
          marginVertical: 30,
        },

        title: {
          marginBottom: 20,
          color: theme.colors.sec2,
          textAlign: "center",
        },

        input: {
          width: windowWidth * 0.8,
          marginBottom: 20,
        },
        search: {
          backgroundColor: theme.colors.green,
          marginVertical: 20,
        },
        cardContainer: {
          justifyContent: "center",
          alignItems: "center",
        },
        contentContainer: {
        },
      }),
    [theme]
  );
  const [searchQ, setSearchQ] = useState<string>("");

  const onChangeSearch = (e: string) => {
    setSearchQ(e);
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View style={{ marginBottom: 30 }}>
      <CatalogCard theme={theme} book={item} navigation={navigation}/>
    </View>
  );
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          View/Edit
        </Text>
        <Text variant="headlineLarge" style={styles.title}>
          Book Catalogue
        </Text>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Searchbar
            placeholder="Search Catalogue"
            onChangeText={onChangeSearch}
            value={searchQ}
            style={styles.search}
          />
          <View style={styles.cardContainer}>
            <FlatList
              data={books}
              renderItem={renderBook}
              horizontal={false}
              style={{ marginBottom: 20 }}
              keyExtractor={(item) => item.title.toString()} // Assuming each book has an 'id' property
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(BookShopCatalog);
