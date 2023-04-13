import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("https://sxu2906.uta.cloud/login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful!") {
          Alert.alert("Success", "Login successful!");
          navigation.navigate("Menu");
        } else {
          Alert.alert("Error", "Invalid username or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image source={require("../assets/logos.png")} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555555"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.guestButtonText}>Continue as a Guest</Text>
        </TouchableOpacity>
        <View style={styles.bottomDivider} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text
              style={styles.signupButtonText}
              onPress={() => navigation.navigate("Register")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
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
    bottom: -180,
  },
  signupText: {
    color: "#555555",
    fontSize: 16,
    textAlign: "center",
  },
  signupButtonText: {
    color: "rgb(0, 149, 246)",
  },
  logo: {
    width: 215,
    height: 60,
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#1c1c1c",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: "white",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#0095F6",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    marginBottom: 16,
  },
  logoutButton: {
    width: "50%",
    backgroundColor: "#0095F6",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    marginBottom: 16,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#555555",
  },
  dividerContainer2: {
    // flexDirection: "row",
    // alignItems: "center",
    width: "1000%",
    // marginBottom: 16,
  },
  divider2: {
    height: 1,
    backgroundColor: "#555555",
  },

  dividerText: {
    paddingHorizontal: 8,
    color: "#555555",
    fontWeight: "bold",
  },
  guestButton: {
    width: "70%",
    backgroundColor: "#1c1c1c",
    borderWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  guestButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  forgotPasswordButton: {
    width: "100%",
    marginBottom: "5%",
    marginTop: "-2%",
    right: -238,
  },
  forgotPasswordButtonText: {
    color: "rgb(0, 149, 246)",
  },
});
export default LoginScreen;
