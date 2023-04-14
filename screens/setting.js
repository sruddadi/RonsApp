import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              const response = await fetch(
                "https://sxu2906.uta.cloud/logout.php",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const data = await response.json();

              if (data.status === "success") {
                navigation.navigate("Login");
              } else {
                Alert.alert("Failed");
              }
            } catch (error) {
              console.error("Fetch error:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="caret-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View />
      </View>
      {/* Contact Picture */}

      {/* Settings */}
      <View style={styles.settingContainer}>
        <Text
          style={styles.settingLabel}
          onPress={() => navigation.navigate("Profile")}
        >
          Personal Information
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
        <Text
          style={styles.settingLabel}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          Change Password
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
    paddingTop: 80,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
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

export default SettingsScreen;
