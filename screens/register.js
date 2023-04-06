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
} from "react-native";
import * as SQLite from "expo-sqlite";
//import DatePicker from "react-native-datepicker";
//import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
const db = SQLite.openDatabase("RonsDB.db");

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");

const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDateOfBirth();
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
    }else{
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
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
    /*if (
      !/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(
        dateOfBirth
      )
    ) {
      Alert.alert("Error", "Please enter a valid date of birth");
      return;
    }*/
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

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, phone_number TEXT, date_of_birth TEXT, password TEXT, hobby TEXT, favorite_genre TEXT)"
      );
      tx.executeSql(
        "SELECT id FROM users WHERE email = ?",
        [email],
        (_, result) => {
          if (result.rows.length > 0) {
            Alert.alert("Error", "User already exists!");
          } else {
            tx.executeSql(
              "SELECT id FROM users WHERE username = ?",
              [username],
              (_, result) => {
                if (result.rows.length > 0) {
                  Alert.alert("Error", "Username is taken. Please try again!");
                } else {
                  tx.executeSql(
                    "INSERT INTO users (username, email, phone_number, date_of_birth, password, hobby, favorite_genre) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [
                      username,
                      email,
                      phoneNumber,
                      dateOfBirth,
                      password,
                      hobby,
                      favoriteGenre,
                    ],
                    (txObj, resultSet) => {
                      Alert.alert("Success", "User registered successfully!", [
                        {
                          text: "OK",
                          onPress: () => navigation.navigate("Login"),
                        },
                      ]);
                    },
                    (txObj, error) => {
                      console.log("Error inserting user: ", error);
                    }
                  );
                }
              }
            );
          }
        },
        (txObj, error) => {
          console.log("Error selecting user: ", error);
        }
      );
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
        <View style={styles.datepicker}>
        <TextInput style={styles.input} 
        placeholder="Date of Birth" 
        placeholderTextColor="gray"
        value={date.toLocaleDateString()}></TextInput><Button onPress={showDatepicker} title="Date of Birth" />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}/>
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
  datepicker: {
    width:'100%',
    marginBottom: 16, 
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
});

export default RegisterScreen;
/*
<DatePicker
style={styles.datepicker}
date={dateOfBirth}
value={dateOfBirth}
mode="date"
placeholder="Date of Birth"
format="DD-MM-YYYY"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
customStyles={{
  dateIcon: {
    position: "absolute",
    right: -5,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    borderColor: "gray",
    alignItems: "flex-start",
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  placeholderText: {
    color: "gray",
    right: -5,
  },
  dateText: {
    right: -5,
  },
}}
onDateChange={setDateOfBirth}
/>*/