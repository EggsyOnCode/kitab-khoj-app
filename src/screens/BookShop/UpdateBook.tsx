import Picker from "@ouroboros/react-native-picker";
import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Text, TextInput, withTheme, Chip } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  theme: any;
  route: any;
}

const UpdateBook: React.FC<props> = ({ theme, route }) => {
  const {id} = route.params
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
        },
        rampContainer: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.green,
          padding: 20,
          borderRadius: 11,
        },
        title: {
          marginBottom: 20,
          color: theme.colors.sec2,
          textAlign: "center",
        },
        title2: {
          marginBottom: 20,
          color: theme.colors.sec2,
          textAlign: "center",
          marginTop: 30,
        },
        input: {
          width: windowWidth * 0.8,
          marginBottom: 20,
        },
        inputCategory: {
          width: windowWidth * 0.4,
          marginBottom: 20,
        },
        chipContainer: {
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: 10,
        },
        chip: {
          margin: 4,
        },
      }),
    [theme]
  );

  const [title, setTitle] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");

  const [categories, setCategories] = useState<string>("");
  const [categoryChips, setCategoryChips] = useState<string[]>([]);

  const [inStock, setInStock] = useState<string>("0");
  const [used, setUsed] = useState<string>("false");

  const handleUsedChange = (value: any) => {
    setUsed(value);
  };
  const handleStock = (text: string) => setInStock(text);
  const handleBookTitle = (text: string) => setTitle(text);
  const handleIban = (text: string) => setIban(text);
  const handleAuthor = (text: string) => setAuthor(text);
  const handlePrice = (text: string) => setPrice(text);
  const handlePublisher = (text: string) => setPublisher(text);
  const handleCategories = (text: string) => setCategories(text);
  const addCategoryChip = () => {
    if (categories.trim() !== "") {
      setCategoryChips([...categoryChips, categories]);
      setCategories(""); // Clear the input after adding the chip
    }
  };

  const removeCategoryChip = (chipText: string) => {
    const updatedChips = categoryChips.filter((chip) => chip !== chipText);
    setCategoryChips(updatedChips);
  };

  const handleSubmit = async (id: number) => {
    try {
      const data = {
        unit_price: price,
        in_stock: inStock,
        used: used,
      };
      console.log("catalog id :", id);
      const res = await axios.put(
        `http://10.7.82.109:3000/v1/BookShopCatalog/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.data.message == "Bookshop catalog updated successfuly") {
        alert("Book updated successfuly");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Your existing content */}
        <Text variant="headlineMedium" style={styles.title2}>
          Update Book
        </Text>

        {/* TextInputs for additional fields */}
        <View style={styles.rampContainer}>
          <TextInput
            label={"Price"}
            value={price}
            onChangeText={handlePrice}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
          />
          <TextInput
            label={"Items in Stock"}
            value={inStock}
            onChangeText={handleStock}
            textColor={theme.colors.black}
            style={styles.input}
          />
          <Text style={{ marginBottom: 10, alignItems: "flex-start" }}>
            Used Or not
          </Text>
          <Picker
            onChanged={handleUsedChange}
            options={[
              { value: "false", text: "False" },
              { value: "true", text: "True" },
            ]}
            style={{
              width: windowWidth * 0.8,
              borderRadius: 5,
              borderColor: theme.colors.sec2,
              backgroundColor: theme.colors.textInput,
              marginBottom: 20,
              padding: 20,
            }}
            value={used}
          />
        </View>

        <Button style={styles.button} onPress={async() => handleSubmit(id)}>
          <Text variant="headlineSmall">Update</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default withTheme(UpdateBook);
