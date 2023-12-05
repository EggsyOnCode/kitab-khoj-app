import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Text } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export default function BookCard({cardStyle, theme}) {
    const styles = React.useMemo(
      () =>
        StyleSheet.create({
          card: {
            width: screenWidth * 0.9,
            backgroundColor: theme.colors.card
          },
        }),
      [theme]
    );

  return (
    <Card style={styles.card}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode={`cover`}
        style={{padding: 5}}
      />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}
