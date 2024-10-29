import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import CreateAccountSuccessful from './CreateAccountSuccessful';
import ResetPasswordViaEmail from './ResetPasswordViaEmail';
import ResetPasswordViaPhone from './ResetPasswordViaPhone';
import ResetNewPassword from './ResetNewPassword';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }} />
      <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="CreateAccountSuccessful" component={CreateAccountSuccessful} options={{title: 'Create Account Successful'}}/>
      <Stack.Screen name='ResetPasswordViaEmail' component={ResetPasswordViaEmail} options={{ title: 'ResetPasswordViaEmail'}}/>
      <Stack.Screen name="ResetPasswordViaPhone" component={ResetPasswordViaPhone} options={{ title: 'ResetPasswordViaPhone' }} />
      <Stack.Screen name="ResetNewPassword" component={ResetNewPassword} options={{ title: 'ResetNewPassword' }} />
      
    </Stack.Navigator>
  );
};

export default AppNavigator;