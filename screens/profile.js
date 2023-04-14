import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [hobby, setHobby] = useState("");
  const [genre, setGenre] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(
          "https://sxu2906.uta.cloud/getUsername.php",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json", // I added this line
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.status === "success") {
          const { username, email, contact, dob, hobby, genre } = data.user;
          setUsername(username);
          setEmail(email);
          setContact(contact);
          setDob(dob);
          setHobby(hobby);
          setGenre(genre);
        } else {
          Alert.alert("Failed");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsername();
  }, []);
  const editUsername = () => {
    navigation.navigate("EditProfile", { username });
  };
  const editEmail = () => {
    navigation.navigate("EditProfile", { email });
  };
  const editContact = () => {
    navigation.navigate("EditProfile", { contact });
  };
  const editDOB = () => {
    navigation.navigate("EditProfile", { dob });
  };
  const editHobby = () => {
    navigation.navigate("EditProfile", { hobby });
  };
  const editGenre = () => {
    navigation.navigate("EditProfile", { genre });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="caret-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <View />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Username</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText} onPress={editUsername}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Email</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText} onPress={editEmail}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Contact</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{contact}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText} onPress={editContact}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Date of Birth</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{dob}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText} onPress={editDOB}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Hobby</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{hobby}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText} onPress={editHobby}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Genre</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{genre}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText} onPress={editGenre}>
            Edit
          </Text>
        </TouchableOpacity>
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
  dataText: {
    color: "gray",
    top: 3,
  },
  editText: {
    top: 3,
    textAlign: "right",
    fontWeight: "bold",
    textDecorationLine: "underline",
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
  editContainer: {
    marginLeft: 350,
    top: -35,
    marginBottom: -10,
    justifyContent: "center",
  },
  settingContainer: {
    justifyContent: "space-between",
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
export default ProfileScreen;
