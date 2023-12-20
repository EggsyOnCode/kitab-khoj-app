import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Card, Text, Chip } from "react-native-paper";
import { Book, CustomerCatalog } from "../types/Book";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;

interface CardProps {
  theme: any;
  book: CustomerCatalog;
}

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="shopping" />;
const RightContent = (props: any) => <Avatar.Icon {...props} icon="menu" />;

export default function BookCard(props: CardProps) {
  const theme = props.theme;
  const book = props.book;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          width: screenWidth * 0.9,
          backgroundColor: theme.colors.card,
        },
        button: {
          backgroundColor: theme.colors.purple,
        },
        title: {
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 5,
          color: theme.colors.textTitle, // Adjust this to match your theme
        },
        infoText: {
          fontSize: 16,
          marginBottom: 5,
          color: theme.colors.textInfo, // Adjust this to match your theme
        },
        usedText: {
          fontSize: 16,
          marginBottom: 10,
          color: theme.colors.textUsed, // Adjust this to match your theme
        },
        genresTitle: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 5,
          color: theme.colors.textGenres, // Adjust this to match your theme
        },
      }),
    [theme]
  );

  const renderGenre = ({ item }: { item: any }) => (
    <View style={{ marginRight: 6 }}>
      <Chip icon="check">{item}</Chip>
    </View>
  );

  const [customer, setCustomer] = useState("");
  const [deliveryLoc, setDeliveryLoc] = useState("");
  const [proc, setProc] = useState(false);

  const fetchCustomerID = async () => {
    const shop = await AsyncStorage.getItem("customer");
    if (shop) {
      const parsedShop = JSON.parse(shop);
      const customerId = parsedShop.customer_id;
      customerId.toString();
      setCustomer(customerId);
      console.log("customer is :", customerId);
      return customerId
      // Handle parsedShop
    } else {
      alert("customer data couldn't be fetched");
    }
  };

  const fetchCusLoc = async () => {
    try {
      await fetchCustomerID();
      const res = await axios.get(
        `http://10.7.82.109:3000/v1/customer/${customer}`
      );
      const loc = (res.data.data.result.delivery_address);
      setDeliveryLoc(loc.toString());
      console.log("delivery location has been set");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async (catalogId: number, price: string) => {
    try {
      await fetchCusLoc();
      console.log("placing order....");
      console.log("customeer in handleorder is", customer);
      

      const order = {
        bookshopcatalog_id: catalogId,
        customer_id: customer,
        delivery_location: deliveryLoc,
        price: price,
      };

      console.log(order);
      const res = await axios.post("http://10.7.82.109:3000/v1/order", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.data.result.length != 0) {
        alert("order created!");
      }
      else{
        console.log("order couldn't be created; error");
        
      }
    } catch (error) {}
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={book.store}
        subtitle={book.store_location}
        left={LeftContent}
      />
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode={`cover`}
        style={{ padding: 5 }}
      />
      <Card.Content>
        <Text style={styles.title}>Title: {book.title}</Text>
        <Text style={styles.infoText}>Author: {book.author}</Text>
        <Text style={styles.infoText}>Publisher: {book.publisher}</Text>

        <Text style={styles.usedText}>
          Used or not? {book.used ? "Yes" : "No"}
        </Text>
        <Text style={styles.genresTitle}>Genres:</Text>
        <FlatList
          data={book.genre}
          renderItem={renderGenre}
          horizontal={true}
          style={{ marginBottom: 20 }}
        />
      </Card.Content>
      <Card.Actions>
        <Chip icon="cash" textStyle={{ fontWeight: "bold", fontSize: 18 }}>
          {book.price}
        </Chip>
        <Button
          style={styles.button}
          onPress={() => handleOrder(book.id, book.price.toString())}
        >
          Order
        </Button>
      </Card.Actions>
    </Card>
  );
}
