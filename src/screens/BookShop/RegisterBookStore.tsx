import { View, StyleSheet, Dimensions, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Avatar,
  withTheme,
  Text,
  TextInput,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import auth, { firebase } from "@react-native-firebase/auth";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
interface props {
  theme: any;
  navigation: any;
}

const RegisterBookStore: React.FC<props> = ({ theme, navigation }) => {
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
      }),
    [theme]
  );

  const getEmail = () => {
    const user = firebase.auth().currentUser;
    return user?.email?.toString();
  };

  //states
  const [name, setName] = useState("");
  const [shopkeeper, setShopkeeper] = useState("");
  const [email, setEmail] = useState("");
  const [bizHelpline, setBizHelpline] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [sadaPay, setsadaPay] = useState("");
  const [proc, setProc] = useState<boolean>(false);
  const [canNav, setcanNav] = useState(false);

  const handleNameChange = (text: string) => {
    setName(text);
  };
  const handleShopkeeper = (text: string) => {
    setShopkeeper(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleBizHelplineChange = (text: string) => {
    setBizHelpline(text);
  };

  const handleLocationChange = (text: string) => {
    setLocation(text);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleBankAccountNumberChange = (text: string) => {
    setBankAccountNumber(text);
  };

  const handleBankAccountNameChange = (text: string) => {
    setBankAccountName(text);
  };

  const handlesadaPayChange = (text: string) => {
    setsadaPay(text);
  };

  useEffect(() => {
    const nav = () => {
      if (canNav) {
        navigation.navigate("BookShopHome");
      }
    };

    nav();
  }, [canNav]);

  const handleSubmit = async () => {
    try {
      setProc(true);
      let shopkeeper_id;
      let bizId;

      const shopkeeperData = {
        email: `${shopkeeper}@gmail.com`,
        name: shopkeeper,
        phone: phoneNumber,
      };

      try {
        const shopkeeperRes = await axios.post(
          "http:/10.7.82.109:3000/v1/Shopkeeper/create",
          shopkeeperData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        shopkeeper_id = shopkeeperRes?.data?.data?.result?.id;
        console.log("Shopkeeper ID:", shopkeeper_id);
      } catch (shopkeeperError) {
        console.error("Shopkeeper API Error:", shopkeeperError);
      }

      const bookshopData = {
        location: location,
        name: name,
        shopkeeper_id: shopkeeper_id,
      };

      try {
        const bookshopRes = await axios.post(
          "http:/10.7.82.109:3000/v1/Bookshop",
          bookshopData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        bizId = bookshopRes?.data?.data?.result?.id;
        console.log("Bookshop ID:", bizId);
      } catch (bookshopError) {
        console.error("Bookshop API Error:", bookshopError);
      }

      const financeData = {
        bookshop_id: bizId,
        bank_name: bankAccountName,
        bank_account: bankAccountNumber,
        sadapay: sadaPay,
      };

      try {
        const finRes = await axios.post(
          "http:/10.7.82.109:3000/v1/BookShopFinance",
          financeData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Finance Response:", finRes.data);
      } catch (financeError) {
        console.error("Finance API Error:", financeError);
      }

      setProc(false);
      try {
        const shop = {
          bookshop_id: bizId,
          shopkeeper_id: shopkeeper_id,
        };

        const storeObj = JSON.stringify(shop);
        await AsyncStorage.setItem("shopData", storeObj);
      } catch (error) {
        alert(error);
      }
      setcanNav(true);

      // navigation.navigate("BookShopHome");
    } catch (mainError) {
      console.error("Main Process Error:", mainError);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text variant="displaySmall" style={styles.title}>
          Business
        </Text>
        <Text variant="displaySmall" style={styles.title}>
          OnRamping
        </Text>

        <Text variant="headlineMedium" style={styles.title2}>
          Business
        </Text>
        <View style={styles.rampContainer} id="Business">
          <TextInput
            label={"Name"}
            value={name}
            onChangeText={handleNameChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />

          <TextInput
            label={"Email"}
            value={email}
            onChangeText={handleEmailChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />

          <TextInput
            label={"Biz Help Line"}
            value={bizHelpline}
            onChangeText={handleBizHelplineChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />

          <TextInput
            label={"Location"}
            value={location}
            onChangeText={handleLocationChange}
            textColor={theme.colors.black}
            style={styles.input}
            multiline={true}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />
        </View>

        <Text variant="headlineMedium" style={styles.title2}>
          Admin/Shopkeeper{"\n"}Details
        </Text>

        <View style={styles.rampContainer} id="Admin">
          <TextInput
            label={"Shopkeeper's Name"}
            value={shopkeeper}
            onChangeText={handleShopkeeper}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />

          <TextInput
            label={"Phone Number"}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />
          {/* Other Admin/Shopkeeper Details */}
        </View>

        <Text variant="headlineMedium" style={styles.title2}>
          Banking Details
        </Text>
        <View style={styles.rampContainer} id="Billing">
          <TextInput
            label={"Bank Account Name"}
            value={bankAccountName}
            onChangeText={handleBankAccountNameChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />

          <TextInput
            label={"Bank Account Number"}
            value={bankAccountNumber}
            onChangeText={handleBankAccountNumberChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />

          <TextInput
            label={"sadaPay Number"}
            value={sadaPay}
            onChangeText={handlesadaPayChange}
            textColor={theme.colors.black}
            style={styles.input}
            theme={{
              colors: {
                text: theme.colors.black,
                primary: theme.colors.purple,
                placeholder: theme.colors.black, // Add any other color properties if needed
              },
            }}
          />
        </View>

        <Button style={styles.button} onPress={handleSubmit}>
          <Text variant="headlineSmall">Register</Text>
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

export default withTheme(RegisterBookStore);
