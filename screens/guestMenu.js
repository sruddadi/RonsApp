import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const MenuScreen = ({ route, navigation }) => {
  const { UID } = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/dashboard.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>Welcome!!</Text>
        <Text style={styles.email}>Guest Login</Text>
        <Text style={styles.ipaTitle}>IPA Sounds</Text>
      </View>

      <View style={styles.ipaContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text
              style={styles.boxTitle}
              onPress={() => navigation.navigate("Phone", { UID })}
            >
              Consonants
            </Text>
          </View>
          <View style={styles.box}>
            <Text
              style={styles.boxTitle}
              onPress={() => navigation.navigate("Vow", { UID })}
            >
              Vowels
            </Text>
          </View>
          <View style={styles.box}>
            <Text
              style={styles.boxTitle}
              onPress={() => navigation.navigate("RS", { UID })}
            >
              R sounds
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.quizContainer}>
        <TouchableOpacity style={styles.quizBox}>
          <Text
            style={styles.quizTitle}
            onPress={() =>
              Alert.alert(
                "Welcome!",
                "Please create an account to use this feature"
              )
            }
          >
            Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dcdcdc",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,
  },
  image: {
    width: 500,
    height: Platform.OS === "ios" ? 200 : 150,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 35,
    color: "white",
    top: -130,
  },
  email: {
    color: "#808080",
    fontSize: 20,
    top: -130,
  },
  ipaContainer: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    width: 340,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -5 : -10,
  },
  ipaTitle: {
    position: "absolute",
    top: 10,
    left: Platform.OS === "ios" ? 30 : 20,
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  boxContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#dadada",
    borderRadius: 10,
    padding: 20,
    top: 17,
    marginBottom: 40,
    alignSelf: "center",
    width: "80%",
    alignItems: "center",
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quizContainer: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    width: 340,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  quizTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
});

if (windowHeight >= 931) {
  styles.quizContainer.marginTop = 40;
  styles.ipaContainer.marginTop = 25;
  styles.ipaTitle.top = 30;
  styles.ipaTitle.left = 35;
}

export default MenuScreen;
