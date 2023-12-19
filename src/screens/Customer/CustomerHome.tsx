import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Searchbar, withTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../components/BookCard";
import { Book, CustomerCatalog } from "../../types/Book";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface CustomerHomeProps {
  theme: any;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ theme }) => {
  const [searchQ, setSearchQ] = useState<string>("");
  const [books, setBooks] = useState<CustomerCatalog[]>([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 15,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: theme.colors.primary,
    },
    title: {
      marginBottom: 30,
      color: theme.colors.sec2,
    },
    search: {
      backgroundColor: theme.colors.green,
      marginBottom: 20,
    },
    cardContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      paddingVertical: 35,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const catalogRes = await axios.get(
            "http://10.7.82.109:3000/v1/BookShopCatalog",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const catalogueBooks: CustomerCatalog[] =
            catalogRes.data.data.result.map((item: any) => {
              return {
                title: item.Book.title,
                author: item.Book.author,
                price: item.unit_price,
                genre: item.Book.genres,
                used: item.used,
                publisher: item.Book.publisher,
                id: item.id,
                store: item.BookShop?.name,
                store_location: item.BookShop?.location,
              };
            });

          console.log(catalogueBooks);
          setBooks(catalogueBooks);
        } catch (error) {
          // Handle errors here
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [])
  );

  const renderBook = ({ item }: { item: CustomerCatalog }) => (
    <View style={{ marginBottom: 30 }}>
      <BookCard theme={theme} book={item} />
    </View>
  );

  const onChangeSearch = (e: string) => {
    setSearchQ(e);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text variant="displayMedium" style={styles.title}>
          Browse Our Catalogues
        </Text>
        <Searchbar
          placeholder="Search Books"
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
  );
};

export default withTheme(CustomerHome);
