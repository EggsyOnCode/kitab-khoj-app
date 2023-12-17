import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text, Chip } from "react-native-paper";
import { Book } from "../types/Book";
import { ScrollView } from "react-native-gesture-handler";
const screenWidth = Dimensions.get("window").width;

interface CardProps {
  theme: any;
  book: Book;
  navigation?: any
}

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;
const RightContent = (props: any) => <Avatar.Icon {...props} icon="menu" />;

export default function CatalogCard(props: CardProps) {
  const theme = props.theme;
  const book = props.book;
  const nav = props.navigation;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          width: screenWidth * 0.9,
          backgroundColor: theme.colors.card,
        },
        buttonRed: {
          backgroundColor: theme.colors.red,
        },
        button: {
          backgroundColor: theme.colors.purple,
        },
        title: {
          fontSize: 21,
          fontWeight: "bold",
          marginBottom: 5,
          width: screenWidth * 0.5,
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

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode={`cover`}
        style={{ padding: 5 }}
      />
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 16,
            alignItems: "center", // Center content vertically
            justifyContent: "space-between", // Spacing between title and chip
          }}
        >
          <Text style={styles.title}>Title: {book.title}</Text>
          <Chip icon="cash" textStyle={{fontSize:16}}>{book.price}</Chip>
        </View>

        <Text style={styles.infoText}>Author: {book.author}</Text>
        <Text style={styles.infoText}>Publisher: {book.pub}</Text>

        <Text style={styles.usedText}>
          Used or not? {book.used ? "Yes" : "No"}
        </Text>
        <Text style={styles.genresTitle}>Genres:</Text>
        <ScrollView>
        <FlatList
          data={book.genre}
          renderItem={renderGenre}
          horizontal={true}
          style={{ marginBottom: 20 }}
        />
        </ScrollView>
      </Card.Content>
      <Card.Actions>
        <View></View>
        <Button style={styles.buttonRed}>Remove</Button>
        <Button style={styles.button} onPress={()=>{nav.navigate("UpdateBook")}}>Update</Button>
      </Card.Actions>
    </Card>
  );
}
