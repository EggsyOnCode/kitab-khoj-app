import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Text, TextInput, withTheme, Chip } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  theme: any;
}

const UpdateBook: React.FC<props> = ({ theme }) => {
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
          Update Book
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
            label={"Price"}
            value={price}
            onChangeText={handlePrice}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
          />
          <TextInput
            label={"Publisher"}
            value={publisher}
            onChangeText={handlePublisher}
            textColor={theme.colors.black}
            style={styles.input}
            // Theme configurations
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
              style={{ backgroundColor: theme.colors.sec2, height: 60 , marginBottom:20}}
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
          <Text variant="headlineSmall">Update</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default withTheme(UpdateBook);
