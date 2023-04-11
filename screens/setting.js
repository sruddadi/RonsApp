import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const SettingsScreen = ({ navigation }) => {
  const [contactImage, setContactImage] = useState(null);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:8888/getUsername.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // I added this line
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.status === "success") {
          setUsername(data.username);
        } else {
          Alert.alert("Failed");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsername();
  }, []);

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
              const response = await fetch("http://localhost:8888/logout.php", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json", // I added this line
                },
              });

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setContactPic(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View />
      </View>
      {/* Contact Picture */}
      <View style={styles.contactContainer}>
        {contactImage ? (
          <Image source={{ uri: contactImage }} style={styles.contactImage} />
        ) : (
          <Text style={styles.noContactImage}>
            {username ? `Username: ${username}` : "Fetching username..."}
          </Text>
        )}
        <Button title="Upload Picture" onPress={pickImage} />
      </View>
      {/* Settings */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
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
    marginBottom: 20,
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
