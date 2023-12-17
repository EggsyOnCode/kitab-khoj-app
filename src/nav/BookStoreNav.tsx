import * as React from "react";
import { BottomNavigation, Text, withTheme } from "react-native-paper";
import BookShopHome from "../screens/BookShop/BookShopHome";
import BookShopOrders from "../screens/BookShop/BookShopOrders";
import BookShopSettings from "../screens/BookShop/BookShopSettings";

interface props{
  theme: any,
  navigation: any
}

const BookStoreNav: React.FC<props> = ({ theme, navigation }) => {
  const [index, setIndex] = React.useState(0);

  const OrdersRoute = () => <BookShopOrders theme={theme} navigation={navigation}/>;
  const SettingsRoute = () => <BookShopSettings />;
  const HomeRoute = ()=><BookShopHome nav={navigation} theme={theme}/>


  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home",
    },
    { key: "orders", title: "Orders", focusedIcon: "cart" },
    { key: "settings", title: "Account", focusedIcon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    orders: OrdersRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor:  theme.colors.darkPurple}}
      activeColor={theme.colors.darkPurple}
      inactiveColor={theme.colors.sec2}
    />
  );
};
export default withTheme(BookStoreNav);
