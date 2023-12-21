import Picker from "@ouroboros/react-native-picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import {
  Button,
  Text,
  TextInput,
  withTheme,
  Chip,
  Snackbar,
} from "react-native-paper";
import TextComp from "../../components/Text";
import PickerDisplay from "../../components/Text";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
interface props {
  navigation: any;
  theme: any;
  route: any;
}

const BookAttributes: React.FC<props> = ({ theme, navigation, route }) => {
  const { pTitle, pAuthor, pIban, link } = route.params;

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

  const [title, setTitle] = useState<string>(pTitle);
  const [iban, setIban] = useState<string>(pIban);
  const [author, setAuthor] = useState<string>(pAuthor);
  const [price, setPrice] = useState<string>("0");
  const [publisher, setPublisher] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [categoryChips, setCategoryChips] = useState<string[]>([]);
  const [inStock, setInStock] = useState<string>("0");
  const [used, setUsed] = useState<string>("false");

  const handleBookTitle = (text: string) => setTitle(text);
  const [proc, setProc] = useState<boolean>(false);
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
  const handleSubmit = async () => {
    // Logic for handling form submission
    setProc(true);
    console.log("Creating the entries....");
    console.log("title: ", title);
    console.log("author: ", author);
    console.log("iban: ", iban);
    console.log("categories: ", categoryChips);
    console.log("categories: ", publisher);
    console.log("photo is:", link);

    let bookId;
    let bookshopId: string;
    const fetchData = async () => {
      const shop = await AsyncStorage.getItem("shopData");
      if (shop) {
        const parsedShop = JSON.parse(shop);
        bookshopId = parsedShop.bookshop_id;
        bookshopId.toString();
        console.log("shop is :", bookshopId);

        // Handle parsedShop
      } else {
        alert("shop data couldn't be fetched");
      }
    };
    await fetchData();
    const createBook = async () => {
      const book = {
        title: title,
        author: author,
        iban: iban,
        publisher: publisher,
        genres: categoryChips,
      };

      const bookRes = await axios.post("http:/10.7.82.109:3000/v1/book", book);
      console.log(bookRes.data);

      bookId = bookRes?.data?.data?.result?.id;
      console.log("bookID: ", bookId);

      const shopCatalogue = {
        book_id: bookId,
        bookshop_id: bookshopId,
        in_stock: inStock,
        unit_price: price,
        used: used,
      };

      const catalogRes = await axios.post(
        "http:/10.7.82.109:3000/v1/BookShopCatalog",
        shopCatalogue,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("catalogue maybe");
      console.log(catalogRes.data);
      const catalogId = catalogRes?.data?.data?.result?.id;

      const media = {
        img_url: link,
        bookshopcatalog_id: catalogId,
      };
      try {
        const uploadResponse = await axios.post(
          "http://10.7.82.109:3000/v1/BookShopCatalog/book-media",
          media
        );
        console.log(uploadResponse.data);
        console.log(catalogRes?.data?.data?.result?.id);
      } catch (error) {
        alert("file upload error");
      }
    };

    await createBook();
    setProc(false);
  };

  // useEffect(() => {
  //   alert(`${pTitle} ${pAuthor} ${pIban}`);
  // }, []);

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
        <Modal
          transparent={true}
          animationType="none"
          visible={proc}
          onRequestClose={() => setProc(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default withTheme(BookAttributes);
