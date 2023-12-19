import Picker from "@ouroboros/react-native-picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button, Text, TextInput, withTheme, Chip } from "react-native-paper";
import TextComp from "../../components/Text";
import PickerDisplay from "../../components/Text";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
interface props {
  navigation: any;
  theme: any;
  //props title: pTitle
  pTitle: string | null;
  pAuthor: string | null;
  pIban: string | null;
}

const BookAttributes: React.FC<props> = ({
  theme,
  navigation,
  pIban,
  pAuthor,
  pTitle,
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
          paddingTop: 20,
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
  const [price, setPrice] = useState<string>("0");
  const [publisher, setPublisher] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [categoryChips, setCategoryChips] = useState<string[]>([]);
  const [inStock, setInStock] = useState<string>("0");
  const [used, setUsed] = useState<string>("false");

  const handleBookTitle = (text: string) => setTitle(text);
  const handleIban = (text: string) => setIban(text);
  const handleAuthor = (text: string) => setAuthor(text);
  const handlePrice = (text: string) => setPrice(text);
  const handlePublisher = (text: string) => setPublisher(text);
  const handleCategories = (text: string) => setCategories(text);
  const handleStock = (text: string) => setInStock(text);
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
  const handleUsedChange = (value: any) => {
    setUsed(value);
  };
  const handleSubmit = () => {
    // Logic for handling form submission
    console.log("Submitting form...");
    console.log("Title:", title);
    console.log("IBAN:", iban);
    console.log("Author:", author);
    console.log("Price:", price);
    console.log("Publisher:", publisher);
    console.log("Categories:", categories);
    // Add further logic to handle form submission
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Your existing content */}
        <Text variant="headlineMedium" style={styles.title2}>
          Finalize Book Attributes
        </Text>

        {/* TextInputs for additional fields */}
        <View style={styles.rampContainer}>
          <TextInput
            label={"Title"}
            value={title}
            onChangeText={handleBookTitle}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
          />
          <TextInput
            label={"IBAN"}
            value={iban}
            onChangeText={handleIban}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
          />
          <TextInput
            label={"Author"}
            value={author}
            onChangeText={handleAuthor}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
          />
          <TextInput
            label={"Unit Price"}
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
          <TextInput
            label={"Publisher"}
            value={publisher}
            onChangeText={handlePublisher}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
          />
          <Text style={{marginBottom:10, alignItems: "flex-start"}}>
            Used Or not
          </Text>
          <Picker
            onChanged={handleUsedChange}
            options={[
              { value: "false", text: "False" },
              { value: "true", text: "True" },
            ]}
            style={{
              width: windowWidth*0.8,
              borderRadius: 5,
              borderColor: theme.colors.sec2,
              backgroundColor: theme.colors.textInput,
              marginBottom: 20,
              padding: 20,
            }}
            value={used}
          />
          <View
            style={{
              flex: 1,
              width: windowWidth * 0.8,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TextInput
              label={"Categories"}
              value={categories}
              onChangeText={handleCategories}
              textColor={theme.colors.black}
              style={styles.inputCategory}
              // Theme configurations
            />
            <Button
              onPress={addCategoryChip}
              style={{
                backgroundColor: theme.colors.secondary,
                height: 60,
                marginBottom: 20,
              }}
            >
              Add Category
            </Button>
          </View>
          <View style={styles.chipContainer}>
            {categoryChips.map((chip, index) => (
              <Chip
                key={index}
                style={styles.chip}
                onClose={() => removeCategoryChip(chip)}
              >
                {chip}
              </Chip>
            ))}
          </View>
        </View>

        <Button style={styles.button} onPress={handleSubmit}>
          <Text variant="headlineSmall">Publish</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default withTheme(BookAttributes);
