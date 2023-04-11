import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import localImage from "../assets/logo.png";
import { Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const QuizScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quizzes</Text>
        <View />
      </View>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Practice</Text>
            <Progress.Bar progress={0.3} width={275} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Quiz - I</Text>
            <Progress.Bar progress={0.3} width={275} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Quiz - II</Text>
            <Progress.Bar progress={0.3} width={275} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Quiz - III</Text>
            <Progress.Bar progress={0.3} width={275} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Quiz - IV</Text>
            <Progress.Bar progress={0.3} width={275} color={"black"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  WelContainer: {
    backgroundColor: "black",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  buttonContainer1: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    backgroundColor: "grey",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 45,
    paddingHorizontal: 50,
    width: 390,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  button1: {
    borderWidth: 5,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: 70,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  buttonText1: {
    color: "white",
    backgroundColor: "black",
    fontSize: 20,

    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  backButton: {
    marginTop: 40,
    flexDirection: "row",
    alignContent: "flex-start",
    paddingLeft: 20,
  },
  Title: {
    textAlign: "center",
    marginLeft: 90,
    fontSize: 30,
    fontStyle: "italic",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
  },
});

export default QuizScreen;
