import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Text, TextInput, withTheme } from "react-native-paper";

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
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [delivery, setDelivery] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [jazzCash, setJazzCash] = useState("");

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

  const handleSubmit = () => {
    console.log("clicked");
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
      </ScrollView>
    </View>
  );
};

export default withTheme(RegisterCustomer);
