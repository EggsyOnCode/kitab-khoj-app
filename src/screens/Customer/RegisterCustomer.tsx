import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Button, Text, TextInput, withTheme } from "react-native-paper";
import { authStore } from "../../utils/authStore";
import { Role } from "../../types/const/data";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface props {
  theme: any;
  navigation: any;
}

const RegisterCustomer: React.FC<props> = ({ theme, navigation }) => {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [delivery, setDelivery] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [jazzCash, setJazzCash] = useState("");
  const [proc, setProc] = useState<boolean>(false);
  const [canNav, setcanNav] = useState(false);
  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlephoneNumberChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handledeliveryChange = (text: string) => {
    setDelivery(text);
  };

  const handleBankAccountNumberChange = (text: string) => {
    setBankAccountNumber(text);
  };

  const handleBankAccountNameChange = (text: string) => {
    setBankAccountName(text);
  };

  const handleJazzCashChange = (text: string) => {
    setJazzCash(text);
  };

  useEffect(() => {
    const nav = () => {
      if (canNav) {
        navigation.navigate("CustomerHomeNav");
      }
    };

    nav();
  }, [canNav]);

  const getEmail = () => {
    const user = firebase.auth().currentUser;
    setEmail(user?.email?.toString());
    return user?.email?.toString();
  };

  const handleSubmit = async () => {
    try {
      setProc(true);
      let customerID;

      console.log("cus email is", getEmail());

      try {
        const customerData = {
          email: getEmail(),
          name: name.toString(),
          phone: phoneNumber.toString(),
          delivery_address: delivery.toString(),
        };

        console.log("customer data: ", customerData);
        const customerRes = await axios.post(
          "http://10.7.82.109:3000/v1/customer/create",
          customerData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        customerID = customerRes?.data?.data?.result?.id;
        console.log("Customer ID:", customerID);
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Customer API Error:", error.response.data);
          console.error("Status Code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
        }
      }

      const financeData = {
        customer_id: customerID,
        bank_name: bankAccountName,
        bank_account: bankAccountNumber,
        sadapay: jazzCash,
      };

      try {
        const finRes = await axios.post(
          "http://10.7.82.109:3000/v1/Customer/create/customer-finance",
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
        const customer = {
          customer_id: customerID,
        };

        const storeObj = JSON.stringify(customer);
        await AsyncStorage.setItem("customer", storeObj);
        const role = {
          role: Role.customer,
        };
        await authStore("role", role);
      } catch (error) {
        alert(error);
      }
      setcanNav(true);
    } catch (mainError) {
      console.error("Main Process Error:", mainError);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text variant="displaySmall" style={styles.title}>
          Customer
        </Text>
        <Text variant="displaySmall" style={styles.title}>
          OnRamping
        </Text>

        <Text variant="headlineMedium" style={styles.title2}>
          Personal Details
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

          {/* <TextInput
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
          /> */}

          <TextInput
            label={"Phone Number"}
            value={phoneNumber}
            onChangeText={handlephoneNumberChange}
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
            label={"Delivery Address"}
            value={delivery}
            onChangeText={handledeliveryChange}
            multiline={true}
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
            label={"Jazzcash Number"}
            value={jazzCash}
            onChangeText={handleJazzCashChange}
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

export default withTheme(RegisterCustomer);
