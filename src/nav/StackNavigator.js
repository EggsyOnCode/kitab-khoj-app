import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Welcome from "../screens/Welcome";
import CustomerHome from "../screens/Customer/CustomerHome";
import { books } from "../types/const/data";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "../utils/firebase";
import Scanner from "../screens/BookShop/Scanner";


const Stack = createStackNavigator();

const StackNavigator = ({ theme }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(false);
  const auth = firebase_auth

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(true);
        // ...
      } else {
        setUser(false);
      }
    });
  }, [user])

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
          initialParams={{theme: theme, navigation: navigation}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen name="CustomerHome" options={{ headerShown: false }}>
        {(props) => <CustomerHome {...props} theme={theme} books={books} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
