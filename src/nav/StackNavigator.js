import React, { useEffect, useState, Text, View } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Welcome from "../screens/Welcome";
import CustomerHome from "../screens/Customer/CustomerHome";
import { books } from "../types/const/data";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "../utils/firebase";
import Scanner from "../screens/BookShop/Scanner";
import RegisterBookStore from "../screens/BookShop/RegisterBookStore";
import RegisterCustomer from "../screens/Customer/RegisterCustomer";
import auth from "@react-native-firebase/auth";
import BookShopHome from "../screens/BookShop/BookShopHome";
import BookStoreNav from "./BookStoreNav";
import BookShopCatalog from "../screens/BookShop/BookShopCatalog";
import UpdateBook from "../screens/BookShop/UpdateBook";
const Stack = createStackNavigator();

const StackNavigator = ({ theme }) => {
  const navigation = useNavigation();
  // const auth = firebase_auth;

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log("state update: ", user);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
          initialParams={{ theme: theme, navigation: navigation }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="BookShopNav">
      <Stack.Screen
        name="BookShopNav"
        component={BookStoreNav}
        options={{ headerShown: false }}
        initialParams={{ theme: theme, navigation: navigation }}
      />
      <Stack.Screen
        name="UpdateBook"
        component={UpdateBook}
        options={{ headerShown: false }}
        initialParams={{ theme: theme, navigation: navigation }}
      />
      <Stack.Screen
        name="BookShopCatalog"
        component={BookShopCatalog}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen name="CustomerHome" options={{ headerShown: false }}>
        {(props) => <CustomerHome {...props} theme={theme} books={books} />}
      </Stack.Screen>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="RegisterCustomer"
        component={RegisterCustomer}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="RegisterBookShop"
        component={RegisterBookStore}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
