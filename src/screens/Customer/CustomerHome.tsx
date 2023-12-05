import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Provider as PaperProvider,
  withTheme,
  Text,
  Searchbar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../components/BookCard";

function CustomerHome({ theme }) {
  const [searchQ, setSearchQ] = useState<string>("");

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
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
            marginBottom: 20
        },
        cardContainer: {
            justifyContent: "center",
            alignItems: "center"
        },
        card: {
            width: "100%",
            backgroundColor: theme.colors.sec2,
        }
      }),
    [theme]
  );

  const onChangeSearch = (e: string) => {
    setSearchQ(e);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text variant="displayMedium" style={styles.title}>
          Browse Our Catalogues
        </Text>
      </SafeAreaView>
      <Searchbar
        placeholder="Search Books"
        onChangeText={onChangeSearch}
        value={searchQ}
        style={styles.search}
      />
      <View style={styles.cardContainer}>
        <BookCard cardStyle={styles.card} theme={theme}/>
      </View>
    </View>
  );
}

export default withTheme(CustomerHome);
