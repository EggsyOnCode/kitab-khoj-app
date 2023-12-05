import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Welcome from "../screens/Welcome";

const Stack = createStackNavigator();

function StackNavigator({ theme }) {
  return (
    <Stack.Navigator>
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
