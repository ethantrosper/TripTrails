import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal'; 

const ResetPasswordViaPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('+1');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Mock database of phone numbers
    const mockDatabasePhoneNumbers = ['+1234567890', '+1987654321'];
    const fullPhoneNumber = `${callingCode} ${phoneNumber}`;

    if (!mockDatabasePhoneNumbers.includes(fullPhoneNumber)) {
      // navigation.navigate('ResetNewPassword');
      setError('The phone number is incorrect, please try again!');
    } else {
      setError('');
      navigation.navigate('ResetNewPassword');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot password</Text>
      <Text style={styles.subText}>Enter your phone number and we will send a reset link</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneInputContainer}>
          <CountryPicker
            countryCode={countryCode}
            withCallingCode
            withFilter
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(`+${country.callingCode[0]}`);
            }}
          />
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.resetByEmail} onPress={() => navigation.navigate('ResetPasswordViaEmail')}>
        Reset password via email
      </Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 50,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  resetByEmail: {
    fontSize: 14,
    color: '#4E4A54',
    textDecorationLine: 'underline',
  },
});

export default ResetPasswordViaPhone;
