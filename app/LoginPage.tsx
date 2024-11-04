import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginPageStyles from "./LoginPageStyle";
import { useAuth } from "./auth/authHooks";
import { Ionicons } from "@expo/vector-icons";

const logoImage = require("../assets/images/app-logo.png");

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    login(username, password);
    if (username === "admin" && password === "password123") {
      Alert.alert("Login Successful!", `Welcome ${username}!`);
      const user = await login(username, password);
      console.log(user);
    } else {
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  };

  return (
    <View style={LoginPageStyles.container}>
      {/* App Title */}
      <Text style={LoginPageStyles.appTitle}>TripTrails</Text>

      {/* Logo and Intro Text */}
      <Image source={logoImage} style={LoginPageStyles.logo} />
      <Text style={LoginPageStyles.signInText}>Sign in to TripTrails</Text>
      <Text style={LoginPageStyles.welcomeMessage}>
        Welcome! Please sign in to continue.
      </Text>

      {/* Username Input */}
      <Text style={LoginPageStyles.inputLabel}>Username</Text>
      <TextInput
        style={LoginPageStyles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <Text style={LoginPageStyles.inputLabel}>Password</Text>
      <View style={{ position: "relative", width: "100%" }}>
        <TextInput
          style={LoginPageStyles.input}
          placeholder="Enter Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={LoginPageStyles.eyeIconContainer}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={LoginPageStyles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={LoginPageStyles.button} onPress={handleLogin}>
        <Text style={LoginPageStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={LoginPageStyles.footer}>
        <Text style={LoginPageStyles.footerText}>
          Don’t have an account?{" "}
          <Text
            style={LoginPageStyles.signUpText}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;
