import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FORGOT YOUR PASSWORD?</Text>
      <Text style={styles.subText}>Not to worry, we got you! Let’s get you a new password</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResetPasswordViaEmail')}>
        <Text style={styles.buttonText}>Reset password</Text>
      </TouchableOpacity>

      <Text style={styles.backToLogin} onPress={() => navigation.navigate('LoginPage')}>Back to login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
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
  backToLogin: {
    fontSize: 14,
    color: '#4E4A54',
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordPage;
