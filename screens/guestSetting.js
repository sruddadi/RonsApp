import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const handleLogout = () => {
  navigation.navigate("Login");
};
const GuestSettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Your Native Language</Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold" }}>English</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>App Version</Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: "bold" }}>1.7.0</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingContainer}>
        <Text
          style={styles.settingLabel}
          onPress={() => navigation.navigate("Login")}
        >
          Create an account!
        </Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="black"
            fontWeight="bold"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel} onPress={handleLogout}>
          Logout
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "black",
    height: Platform.OS === "ios" ? 110 : 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
    color: "white",
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  backContainer: {
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  contactContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  noContactImage: {
    fontSize: 16,
    marginBottom: 10,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default GuestSettingsScreen;
