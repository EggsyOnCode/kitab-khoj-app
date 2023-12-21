import AsyncStorage from "@react-native-async-storage/async-storage";

export const authStore = async (storeId: string, storeObj: any) => {
  try {
    const obj = JSON.stringify(storeObj);
    await AsyncStorage.setItem(storeId, obj);
    alert(`obj is ${obj}`)
  } catch (error) {
    alert(error);
  }
};

export const storeShop = async (bizId:any, shopkeeper_id: any)=>{
    const shop = {
      bookshop_id: bizId,
      shopkeeper_id: shopkeeper_id,
    };

    const storeObj = JSON.stringify(shop);
    await AsyncStorage.setItem("shopData", storeObj);
}


export const storeCustomer = async (cusId: any) => {
  const customer = {
    customer_id: cusId,
  };

  const storeObj = JSON.stringify(customer);
  await AsyncStorage.setItem("customer", storeObj);
};

export const authReturnRole = async () => {
  const res = await AsyncStorage.getItem("role");
  if (res) {
    const parseRes = JSON.parse(res);
    alert(`role is : ${parseRes.role}`);
    return parseRes.role;
    // Handle parsedShop
  } else {
    return null;
  }
};


export const checkRoleAsync = async () => {
  try {
    const rol = await AsyncStorage.getItem("role");
    if (rol) {
      const parsedShop = JSON.parse(rol);
      alert(`${parsedShop.role}`);
      return parsedShop.role;
    } else {
      alert("Role data couldn't be fetched");
      return null;
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    return null;
  }
};


