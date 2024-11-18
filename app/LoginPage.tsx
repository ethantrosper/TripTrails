import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginPageStyles from './LoginPageStyle';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './auth/authHooks';

const logoImage = require('../assets/images/app-logo.png');

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login, getCurrentUser } = useAuth();

  const handleLogin = async () => {
    const user = await login(username, password);
    const currUser = await getCurrentUser();
    console.log(currUser);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main Content */}
      <KeyboardAvoidingView
        style={LoginPageStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Text style={LoginPageStyles.appTitle}>TripTrails</Text>
          <Image source={logoImage} style={LoginPageStyles.logo} />
          <Text style={LoginPageStyles.signInText}>Sign in to TripTrails</Text>
          <Text style={LoginPageStyles.welcomeMessage}>
            Welcome! Please sign in to continue.
          </Text>
          <Text style={LoginPageStyles.inputLabel}>Username</Text>
          <TextInput
            style={LoginPageStyles.input}
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={LoginPageStyles.inputLabel}>Password</Text>
          <View style={{ position: 'relative', width: '100%' }}>
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
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={LoginPageStyles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={LoginPageStyles.button} onPress={handleLogin}>
            <Text style={LoginPageStyles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          {/* Footer */}
          <View style={LoginPageStyles.footer}>
            <Text style={LoginPageStyles.footerText}>
              Don’t have an account?{' '}
              <Text
                style={LoginPageStyles.signUpText}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;
