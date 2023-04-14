import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen = ({ navigation }) => {
  // State variables for storing the current and new passwords
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Function to handle updating the password
  const updatePassword = () => {
    // Validate if the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      Alert.alert(
        "Error",
        "New password and confirm new password do not match!"
      );
      return;
    }

    // Prepare the updated password data
    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);

    // Send a POST request to the PHP API endpoint with the updated password data
    fetch("https://sxu2906.uta.cloud/updatePassword.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Password updated successfully") {
          Alert.alert("Success", "Password updated successfully!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Setting"),
            },
          ]);
        } else if (data.message === "Failed to update password") {
          Alert.alert("Error", "Failed to update password. Please try again!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Setting"),
            },
          ]);
        } else if (data.message === "Old password doesn't match!") {
          Alert.alert("Error", "Old password doesn't match!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("ChangePassword"),
            },
          ]);
        } else {
          Alert.alert("Error", "Failed to update password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ left: -5 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Password</Text>
        <View />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Current Password</Text>
        <TextInput
          style={styles.textInput}
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          secureTextEntry={true}
          placeholder={"Enter current password"}
        />
        <Text style={styles.settingLabel}>New Password</Text>
        <TextInput
          style={styles.textInput}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry={true}
          placeholder={"Enter new password"}
        />
        <Text style={styles.settingLabel}>Confirm New Password</Text>
        <TextInput
          style={styles.textInput}
          value={confirmNewPassword}
          onChangeText={(text) => setConfirmNewPassword(text)}
          secureTextEntry={true}
          placeholder={"Confirm new password"}
        />
        {/* Render editable fields and form components for updating the password */}
        <TouchableOpacity style={styles.editButton} onPress={updatePassword}>
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: -15,
  },
  settingContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;