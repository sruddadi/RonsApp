import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  LogBox,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [dob, setDOB] = useState("");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleRegister = () => {
    if (
      username === "" ||
      email === "" ||
      phoneNumber === "" ||
      // dateOfBirth === "" ||
      password === "" ||
      confirmPassword === "" ||
      hobby === "" ||
      favoriteGenre === ""
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username)) {
      Alert.alert("Error", "Please enter a valid username");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    // if (
    //   !/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(
    //     dateOfBirth
    //   )
    // ) {
    //   Alert.alert("Error", "Please enter a valid date of birth");
    //   return;
    // }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\s]).{8,}$/.test(
        password
      )
    ) {
      Alert.alert("Error", "Please enter a valid password");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again!");
      return;
    }
    if (!/^[a-zA-Z]{3,10}$/.test(hobby)) {
      Alert.alert("Error", "Please enter a valid hobby");
      return;
    }
    if (!/^[a-zA-Z]{3,10}$/.test(favoriteGenre)) {
      Alert.alert("Error", "Please enter a valid genre");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dob", dob);
    formData.append("password", password);
    formData.append("hobby", hobby);
    formData.append("favoriteGenre", favoriteGenre);

    fetch("https://sxu2906.uta.cloud/register.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User registered successfully") {
          Alert.alert("Success", "User registered successfully!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]);
        } else if (data.message === "User already exists") {
          Alert.alert("Error", "User already exists. Please try again!", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="gray"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              ...styles.inputdate,
              color:
                date.toDateString() === new Date().toDateString()
                  ? "gray"
                  : "white",
            }}
            placeholder="Date of Birth"
            placeholderTextColor="gray"
            value={
              date.toDateString() === new Date().toDateString()
                ? "Date of birth"
                : date.toLocaleDateString()
            }
            editable={false}
            onChangeText={setDOB}
            // Set TextInput to non-editable
          ></TextInput>
          <View style={styles.iconContainer}>
            <Icon
              name="calendar"
              onPress={showDatepicker}
              type="material-community"
              color="white"
              component={MaterialIcons}
            />
          </View>
          {show && (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                opacity: 20,
              }}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                textColor="white"
                mode={"date"}
                display="spinner"
                is24Hour={true}
                onChange={onChange}
              />
            </View>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Hobby"
          placeholderTextColor="gray"
          value={hobby}
          onChangeText={setHobby}
        />
        <TextInput
          style={styles.input}
          placeholder="Favorite Genre"
          placeholderTextColor="gray"
          value={favoriteGenre}
          onChangeText={setFavoriteGenre}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.bottomDivider} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText} onPress={() => navigation.goBack()}>
            Go Back
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: "white",
  },
  inputdate: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    padding: 8,
    left: 13,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  datepicker: {
    width: "100%",
    marginBottom: 16,
    // flexDirection: "row",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#0095F6",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomDivider: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#555555",
  },
  signupContainer: {
    bottom: -85,
  },
  signupText: {
    color: "#rgb(0, 149, 246)",
    fontSize: 16,
    textAlign: "center",
  },
  iconContainer: {
    left: -13,
    bottom: -10,
  },
});

export default RegisterScreen;
