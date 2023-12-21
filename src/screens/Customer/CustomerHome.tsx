import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Text,
  Searchbar,
  withTheme,
  SegmentedButtons,
  Button,
  Avatar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../components/BookCard";
import { Book, CustomerCatalog } from "../../types/Book";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { book } from "../../types/const/data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
interface CustomerHomeProps {
  theme: any;
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ theme }) => {
  const [searchQ, setSearchQ] = useState<string>("");
  const [books, setBooks] = useState<CustomerCatalog[]>([]);
  const [searchFilter, setSearchFilter] = React.useState("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [filteredBooks, setFilteredBooks] = useState<CustomerCatalog[] | null>(
    null
  );
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
      width: windowWidth * 0.74,
    },
    cardContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      paddingVertical: 35,
    },
    button: {
      backgroundColor: theme.colors.green,
    },
    button2: {
      backgroundColor: theme.colors.green,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      // const fetchCus = async () => {
      //   const cus = await AsyncStorage.getItem("customer");
      //   if (cus) {
      //     const parsedShop = JSON.parse(cus);
      //     alert(`${parsedShop.customer_id}`);
      //     // Handle parsedShop
      //   } else {
      //     alert("customer data couldn't be fetched");
      //   }
      // };
      // fetchCus();

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

  const handleSearch = async () => {
    try {
      console.log("searching...");
      console.log(searchQ);

      setProcessing(true);

      if (searchQ === "") {
        const searchRes = await axios.get(
          "http://10.7.82.109:3000/v1/bookshop/?searchQuery=",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Transform the response and update books
        const transformedData: CustomerCatalog[] = searchRes.data.data.result
          .map((item: any) => {
            const books = item.Books.map((book: any) => ({
              id: book.BookShopCatalog.id,
              title: book.title,
              author: book.author,
              price:
                item.BookShopFinance?.unit_price ||
                book.BookShopCatalog.unit_price,
              genre: book.genres || [],
              used: book.BookShopCatalog.used || false,
              publisher: book.publisher,
              store: item.name,
              store_location: item.location,
            }));

            return books;
          })
          .flat();

        setBooks(transformedData);
      } else {
        const searchRes = await axios.get(
          `http://10.7.82.109:3000/v1/bookshop/?searchQuery=${searchQ}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(searchRes);

        const transformedData: CustomerCatalog[] = searchRes.data.data.result
          .map((item: any) => {
            const books = item.Books.map((book: any) => ({
              id: book.BookShopCatalog.id,
              title: book.title,
              author: book.author,
              price:
                item.BookShopFinance?.unit_price ||
                book.BookShopCatalog.unit_price,
              genre: book.genres || [],
              used: book.BookShopCatalog.used || false,
              publisher: book.publisher,
              store: item.name,
              store_location: item.location,
            }));

            return books;
          })
          .flat();

        console.log(transformedData);
        setBooks(transformedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessing(false); // Set processing state to false after search is done
    }
  };

  const multiParamSearch = (searchText: string) => {
    console.log(searchText);

    const filtered = books.filter((book) => {
      // Apply search criteria for author, title, publisher, and genre
      console.log(book);
      return (
        book.author.toLowerCase().includes(searchText.toLowerCase()) ||
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchText.toLowerCase()) ||
        book.genre?.some((g) =>
          g.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    });
    console.log(filteredBooks);

    // Update the filtered results
    setFilteredBooks(filtered);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text variant="displayMedium" style={styles.title}>
          Browse Our Catalogues
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <Searchbar
            placeholder="Search Books"
            onChangeText={onChangeSearch}
            value={searchQ}
            style={styles.search}
          />
          <TouchableOpacity onPress={() => multiParamSearch(searchQ)}>
            {processing ? (
              <ActivityIndicator size="small" color={theme.colors.primary} /> // Display loader when processing is true
            ) : (
              <Avatar.Icon icon="arrow-up" />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <SegmentedButtons
            value={searchFilter}
            onValueChange={setSearchFilter}
            buttons={[
              {
                value: "title",
                label: "Title",
                uncheckedColor: theme.colors.primary,
                style: styles.button,
                checkedColor: theme.colors.red,
              },
              {
                value: "author",
                label: "Author",
                uncheckedColor: theme.colors.primary,
                style: styles.button,
                checkedColor: theme.colors.red,
              },
              {
                value: "publisher",
                label: "Publisher",
                uncheckedColor: theme.colors.primary,
                style: styles.button,
                checkedColor: theme.colors.red,
              },
            ]}
          />
          <SegmentedButtons
            value={searchFilter}
            onValueChange={setSearchFilter}
            buttons={[
              {
                value: "iban",
                label: "IBAN",
                uncheckedColor: theme.colors.primary,
                style: styles.button,
                checkedColor: theme.colors.red,
              },
              {
                value: "genre",
                label: "Genre",
                uncheckedColor: theme.colors.primary,
                style: styles.button,
                checkedColor: theme.colors.red,
              },
            ]}
          />
        </View>
        <View style={styles.cardContainer}>
          {filteredBooks ? (
            <FlatList
              data={filteredBooks}
              renderItem={renderBook}
              horizontal={false}
              style={{ marginBottom: 20 }}
              keyExtractor={(item) => item.id.toString()} // Assuming each book has an 'id' property
            />
          ) : (
            <FlatList
              data={books}
              renderItem={renderBook}
              horizontal={false}
              style={{ marginBottom: 20 }}
              keyExtractor={(item) => item.id.toString()} // Assuming each book has an 'id' property
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default withTheme(CustomerHome);
