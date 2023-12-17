import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Searchbar , withTheme} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import BookCard from "../../components/BookCard";
import { Book } from "../../types/Book";
import { ScrollView } from "react-native-gesture-handler";

interface CustomerHomeProps {
  theme: any;
  books: Book[];
}

const CustomerHome: React.FC<CustomerHomeProps> = ({ theme, books }) => {
  const [searchQ, setSearchQ] = useState<string>("");

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

  const renderBook = ({ item }: { item: Book }) => (
    <View style={{ marginBottom: 30 }}>
      <BookCard theme={theme} book={item} />
    </View>
  );

  const onChangeSearch = (e: string) => {
    setSearchQ(e);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              keyExtractor={(item) => item.title.toString()} // Assuming each book has an 'id' property
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(CustomerHome);
