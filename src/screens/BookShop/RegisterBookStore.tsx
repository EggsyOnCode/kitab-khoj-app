import { View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Button, Avatar, withTheme, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

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

  //states
  const [name, setName] = useState("");
  const [shopkeeper, setShopkeeper] = useState("");
  const [email, setEmail] = useState("");
  const [bizHelpline, setBizHelpline] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [jazzCash, setJazzCash] = useState("");

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

export default withTheme(RegisterBookStore);
