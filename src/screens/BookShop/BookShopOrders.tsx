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
import { Book, CustomerCatalog, OrderedBook, ShopOrders } from "../../types/Book";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { book } from "../../types/const/data";
import OrderCard from "../../components/OrderCard";
import ShopOrderCard from "../../components/ShopOrderCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
interface BookShopOrderProps {
  theme: any;
  navigation: any;
}

const BookShopOrder: React.FC<BookShopOrderProps> = ({
  theme,
  navigation,
}) => {
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

  const [orderedBooks, setOrderedBooks] = useState<ShopOrders[] | null>();

  const fetchShopID = async () => {
    const shop = await AsyncStorage.getItem("shopData");
    if (shop) {
      const parsedShop = JSON.parse(shop);
      const bookshopId = parsedShop.bookshop_id;
      console.log(bookshopId);
      // bookshopId.toString();
      console.log("shop is :", bookshopId);
      return bookshopId
      // Handle parsedShop
    } else {
      alert("shop data couldn't be fetched");
    }
  };

  const fetchBookData = async (catalogId: number) => {
    try {
      const res = await axios.get(
        `http://10.7.82.109:3000/v1/BookShopCatalog/item/${catalogId}`
      );

      return res.data.data.result[0].Book;
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const shopId = await fetchShopID();
          console.log("shop is: ", shopId);

          const orderRes = await axios.get(
            `http://10.7.82.109:3000/v1/order/shop/${shopId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log(orderRes.data);
          

          const orderedBooksPromises: Promise<ShopOrders>[] =
            orderRes.data.data.result.map(async (item: any) => {
              const bookData = await fetchBookData(item.bookshopcatalog_id);
              return {
                id: item.id,
                title: bookData.title,
                author: bookData.author,
                price: item.price,
                publisher: bookData.publisher,
                customer: item.Customer.name,
                delivery_location: item.Customer.delivery_address,
              };
            });

          const orderedBooks = await Promise.all(orderedBooksPromises);
          console.log(orderedBooks);
          setOrderedBooks(orderedBooks);
        } catch (error) {
          // Handle errors here
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [])
  );

  const renderBook = ({ item }: { item: ShopOrders }) => (
    <View style={{ marginBottom: 30 }}>
      <ShopOrderCard theme={theme} book={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text variant="displayMedium" style={styles.title}>
          Browse Your Orders
        </Text>
        <View style={styles.cardContainer}>
          <FlatList
            data={orderedBooks}
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

export default withTheme(BookShopOrder);
