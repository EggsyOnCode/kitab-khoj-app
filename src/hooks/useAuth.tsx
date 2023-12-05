import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import auth from "@react-native-firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user : any) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return {user}
};

export default useAuth;
