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

const EditProfileScreen = ({ route, navigation }) => {
  // Extract the username and email from the route.params object
  const { username, email, contact, dob, hobby, genre } = route.params;

  // State variables for storing the edited values
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedContact, setEditedContact] = useState(contact);
  const [editedDOB, setEditedDOB] = useState(dob);
  const [editedHobby, setEditedHobby] = useState(hobby);
  const [editedGenre, setEditedGenre] = useState(genre);

  // Function to handle updating the database with the edited values
  const updateProfile = () => {
    // Prepare the updated profile data
    const formData = new FormData();
    formData.append("editedUsername", editedUsername);
    formData.append("editedEmail", editedEmail);
    formData.append("editedContact", editedContact);
    formData.append("editedDOB", editedDOB);
    formData.append("editedHobby", editedHobby);
    formData.append("editedGenre", editedGenre);

    // Send a POST request to the PHP API endpoint with the updated profile data
    fetch("https://sxu2906.uta.cloud/updateProfile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Profile updated successfully") {
          Alert.alert("Success", "Profile updated successfully!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Setting"),
            },
          ]);
        } else if (data.message === "Failed to register user") {
          Alert.alert("Error", "User already exists. Please try again!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Setting"),
            },
          ]);
        } else {
          Alert.alert("Error", "Failed to register user");
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
          style={{ left: -15 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <View />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>
          {username
            ? "Username"
            : email
            ? "Email"
            : contact
            ? "Contact"
            : dob
            ? "Date of Birth"
            : hobby
            ? "Hobby"
            : "Genre"}
        </Text>
        <TextInput
          style={styles.textInput}
          value={
            editedUsername ||
            editedEmail ||
            editedContact ||
            editedDOB ||
            editedHobby ||
            editedGenre
          }
          onChangeText={(text) => {
            if (username) {
              setEditedUsername(text);
            } else if (email) {
              setEditedEmail(text);
            } else if (contact) {
              setEditedContact(text);
            } else if (dob) {
              setEditedDOB(text);
            } else if (hobby) {
              setEditedHobby(text);
            } else if (genre) {
              setEditedGenre(text);
            }
          }}
          placeholder={"Enter new value"}
        />
        {/* Render editable fields and form components for editing the profile */}
        <TouchableOpacity style={styles.editButton} onPress={updateProfile}>
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  editButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
  settingContainer: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default EditProfileScreen;
