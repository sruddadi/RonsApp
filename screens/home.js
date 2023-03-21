import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import localImage from "../assets/logo3.png";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 1000); // Change the number (in milliseconds) to adjust the timer
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={localImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  image: {
    width: 332,
    height: 500,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 60,
  },
  button: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 170,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  button1: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 170,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default HomeScreen;
