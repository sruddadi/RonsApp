import React, { useEffect } from "react";
import { Alert } from "react-native";

const DummyScreen = ({ navigation }) => {
  useEffect(() => {
    Alert.alert(
      "Welcome!",
      "Please create an account to use this feature",
      [{ text: "OK", onPress: () => navigation.navigate("GuestMain") }],
      { cancelable: false }
    );
  }, [navigation]);

  return null;
};

export default DummyScreen;
