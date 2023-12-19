import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { Book, CatalogueBook } from "../../types/Book";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          flex: 1,
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
        contentContainer: {},
      }),
    [theme]
  );

  const [searchQ, setSearchQ] = useState<string>("");
  const [books,setBooks] = useState<CatalogueBook[]>([])
  useEffect(() => {
    const fetchBooks = async () => {
      let bookshopId: number;
      const fetchShop = async () => {
        const shop = await AsyncStorage.getItem("shopData");
        if (shop) {
          const parsedShop = JSON.parse(shop);
          bookshopId = parsedShop.bookshop_id;
          bookshopId.toString();
          console.log("shop is :", bookshopId);

          // Handle parsedShop
        } else {
          alert("shop data couldn't be fetched");
        }
      };
      await fetchShop();
      
      const fetchData = async () => {
        const catalogRes = await axios.get(
          `http://10.7.82.109:3000/v1/BookShopCatalog/${bookshopId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const catalogueBooks: CatalogueBook[] = catalogRes.data.data.result.map((item: any) => {
          return {
            title: item.Book.title,
            author: item.Book.author,
            price: item.unit_price,
            genre: item.Book.genres,
            used: item.used,
            publisher: item.Book.publisher,
            id: item.id
          };
        });

        console.log(catalogueBooks);
        setBooks(catalogueBooks)
      };

      fetchData();
    };
    
    fetchBooks();
  }, []);

  const onChangeSearch = (e: string) => {
    setSearchQ(e);
  };

  const renderBook = ({ item }: { item: CatalogueBook }) => (
    <View style={{ marginBottom: 30 }}>
      <CatalogCard theme={theme} book={item} navigation={navigation} />
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
              keyExtractor={(item) => item.id.toString()} // Assuming each book has an 'id' property
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(BookShopCatalog);
