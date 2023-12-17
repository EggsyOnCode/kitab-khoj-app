import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import StackNavigator from "./StackNavigator";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Drawer = createDrawerNavigator();

const handleSignOut = async () => {
  auth()
    .signOut()
    .then(() => {
      console.log("User account signed out!");
      alert("You are logged out!");
    })
    .catch((error) => {
      console.log(error);

      console.error(error);
    });
  await GoogleSignin.revokeAccess();
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
}

function DrawerNav({ theme }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.green,
          width: 150,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Screens"
        component={StackNavigator}
        options={{ headerShown: false }}
        initialParams={{ theme: theme }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
