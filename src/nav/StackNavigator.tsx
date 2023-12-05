import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Welcome from "../screens/Welcome";
import CustomerHome from "../screens/Customer/CustomerHome";
import { books } from "../types/const/data";

const Stack = createStackNavigator();

function StackNavigator({ theme }: {theme: any}) {
  return (
    <Stack.Navigator initialRouteName="CustomerHome">
      <Stack.Screen name="CustomerHome" options={{ headerShown: false }}>
        {(props) => <CustomerHome {...props} theme={theme} books={books} />}
      </Stack.Screen>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
