import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Book } from "../types/Book";
const screenWidth = Dimensions.get("window").width;

interface CardProps {
  theme: any;
  cardStyle: any;
  book: Book;
}


const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function BookCard(props: CardProps) {
  const theme = props.theme;
  const cardStyle = props.cardStyle;
  const book = props.book;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        card: {
          width: screenWidth * 0.9,
          backgroundColor: theme.colors.card,
        },
      }),
    [theme]
  );

  return (
    <Card style={styles.card}>
      <Card.Title title={book.seller.name} subtitle={book.seller.location} left={LeftContent}/>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode={`cover`}
        style={{ padding: 5 }}
      />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}
