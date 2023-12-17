import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Avatar, Button, Icon, Text } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  title: string;
  theme: any;
  handleButton: () => void;
  navigation: any;
}

const BookHomeButton: React.FC<props> = ({
  theme,
  title,
  handleButton,
  navigation,
}) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: theme.colors.primary,
          padding: 20,
          flexGrow: 1,
          paddingRight: 2,
          paddingTop: 60,
        },
        button: {
          paddingVertical: 8,
          width: windowWidth * 0.92,
          borderRadius: 11,
          backgroundColor: theme.colors.secondary,
          marginVertical: 30,
          justifyContent: "center", // Center content vertically
          alignItems: "center", // Center content horizontally
        },
        content: {
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [theme]
  );

  return (
    <Button style={styles.button} onPress={handleButton}>
      <View style={styles.content}>
        <Avatar.Icon icon="book" size={50} />
        <Text variant="headlineSmall" style={{paddingHorizontal:10}}>
          {title}
        </Text>
        <Avatar.Icon icon="arrow-right" size={50} />
      </View>
    </Button>
  );
};

export default BookHomeButton;

