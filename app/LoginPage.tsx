import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import LoginPageStyles from './LoginPageStyle';

const logoImage = require('../assets/images/app-logo.png');

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password123') {
      Alert.alert('Login Successful!', `Welcome, ${username}!`);
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={LoginPageStyles.container}>
      {/* Image Icon */}
      <Image
        source={logoImage}
        style={LoginPageStyles.logo}
      />

      <Text style={LoginPageStyles.welcomeText}>Welcome to TripTrails!</Text>
      <StatusBar style="auto" />

      {/* Username Input */}
      <TextInput
        style={LoginPageStyles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={LoginPageStyles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity 
        style={LoginPageStyles.button} 
        onPress={handleLogin}        
      >
        <Text style={LoginPageStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginPage;
