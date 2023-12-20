import React, { useEffect, useState, Text, View } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Welcome from "../screens/Welcome";
import CustomerHome from "../screens/Customer/CustomerHome";
import { Role, books } from "../types/const/data";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "../utils/firebase";
import Scanner from "../screens/BookShop/Scanner";
import RegisterBookStore from "../screens/BookShop/RegisterBookStore";
import RegisterCustomer from "../screens/Customer/RegisterCustomer";
import auth from "@react-native-firebase/auth";
import BookShopHome from "../screens/BookShop/BookShopHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookStoreNav from "./BookStoreNav";
import BookShopCatalog from "../screens/BookShop/BookShopCatalog";
import UpdateBook from "../screens/BookShop/UpdateBook";
import BookAttributes from "../screens/BookShop/BookAttributes";
import CustomerHomeNav from "./CustomerHomeNav";
const Stack = createStackNavigator();

const StackNavigator = ({ theme }) => {
  const navigation = useNavigation();
  // const auth = firebase_auth;

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
  const [role, setRole] = useState("");
  const [initRoute, setInitRoute] = useState("Welcome");

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      const fetchRole = async () => {
        try {
          const rol = await AsyncStorage.getItem("role");
          if (rol) {
            const parsedShop = JSON.parse(rol);
            alert(`${parsedShop.role} ${typeof parsedShop.role}`);
            setRole(parsedShop.role);
            if (parsedShop.role === "CUSTOMER") {
              console.log("setting init route as customer nav");
              setInitRoute("CustomerHomeNav");
            } else if (parsedShop.role === "SHOPKEEPER") {
              console.log("setting init route as bookshop nav");
              setInitRoute("BookShopHome");
            } else {
              console.log("setting init route as welcome");
              setInitRoute("Welcome");
            }
          } else {
            alert("Role data couldn't be fetched");
            setRole(null);
            setInitRoute("Welcome");
          }
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null);
          setInitRoute("Welcome");
        }
      };

      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      // fetchRole();

      return () => subscriber(); // Unsubscribe on unmount
    }, [])
  );

  useEffect(() => {
    const determineInitRoute = async () => {
      try {
        console.log("determing the route");
        const role = await AsyncStorage.getItem("role");
        if (role) {
          const parsed = JSON.parse(role);
          if (parsed.role === "CUSTOMER") {
            console.log("setting to customer");
            setInitRoute("CustomerHomeNav");
          } else if (parsed.role === "SHOPKEEPER") {
            setInitRoute("BookShopHome");
          } else {
            setInitRoute("Welcome");
          }
        }
      } catch (error) {
        console.error("Error determining init route:", error);
        setInitRoute("Welcome");
      }
    };
    determineInitRoute();
  }, [initRoute, role]);

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
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="BookShopNav"
        component={BookStoreNav}
        options={{ headerShown: false }}
        initialParams={{ theme: theme, navigation: navigation }}
      />
      <Stack.Screen
        name="CustomerHomeNav"
        component={CustomerHomeNav}
        options={{ headerShown: false }}
        initialParams={{ theme: theme, navigation: navigation }}
      />
      <Stack.Screen
        name="BookAttributes"
        component={BookAttributes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookShopHome"
        component={BookShopHome}
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
