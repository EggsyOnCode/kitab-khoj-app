import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Welcome from "../screens/Welcome";
import CustomerHome from "../screens/Customer/CustomerHome";

const Stack = createStackNavigator();

function StackNavigator({ theme }:{theme:any}) {
  return (
    <Stack.Navigator initialRouteName="CustomerHome">
      <Stack.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
