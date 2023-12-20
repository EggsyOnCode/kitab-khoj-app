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
interface CustomerOrdersProps {
  theme: any;
  navigation: any
}

const CustomerOrders: React.FC<CustomerOrdersProps> = ({ theme, navigation }) => {
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



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text variant="displayMedium" style={styles.title}>
          Browse Your Orders
        </Text>
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

export default withTheme(CustomerOrders);
