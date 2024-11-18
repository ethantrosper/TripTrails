import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './auth/authHooks';

const SignUpPage = () => {
  const { login, signUp, getCurrentUser } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const minLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && minLength;
  };

  const handleCreateAccount = async () => {
    if (validatePassword(password)) {
      //Test for now
      const user = await signUp('admin', 'Password123');
      navigation.navigate('CreateAccountSuccessful');
    } else {
      alert('Password does not meet the requirements. Please try again.');
      navigation.navigate('CreateAccountSuccessful');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Title */}
      <Text style={styles.header}>Create your account</Text>
      
      {/* Username Input -- First/Last name */}
      <View style={styles.rowContainer}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>First name</Text>
          <TextInput style={[styles.input, styles.halfWidth]} />
        </View>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Last name</Text>
          <TextInput style={[styles.input, styles.halfWidth]} />
        </View>
      </View>

      {/* Username Input --- Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} />
      </View>

      {/* Username Input --- Email Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} keyboardType="email-address" />
      </View>

      {/* Username Input --- Phone# */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" />
      </View>

      {/* Username Input -- Account Password*/}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#555"
              style={[styles.eyeIcon, { top: -10 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Note about Setting Password */}
      <Text style={styles.passwordRequirements}>Password requirements:
        {'\n'}• At least 8 characters
        {'\n'}• Contain both lower and uppercase letters
        {'\n'}• Contain at least 1 number
      </Text>
      
      {/* Create Account Link */}
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      
      {/* Footer */}
      <Text style={styles.signInText}>Already have an account? <Text style={styles.signInLink} onPress={() => navigation.navigate('LoginPage')}>Sign in</Text></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainerHalf: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  halfWidth: {
    width: '100%',
  },
  passwordRequirements: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    marginRight: 90, 
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#4E4A54',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#555',
  },
  signInLink: {
    color: '#4E4A54',
    fontWeight: 'bold',
  },
});

export default SignUpPage;
