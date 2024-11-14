
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginPage from './LoginPage';
// import SignUpPage from './SignUpPage';
// import ForgotPasswordPage from './ForgotPasswordPage';
// import CreateAccountSuccessful from './CreateAccountSuccessful';
// import ResetPasswordViaEmail from './ResetPasswordViaEmail';
// import ResetPasswordViaPhone from './ResetPasswordViaPhone';
// import ResetNewPassword from './ResetNewPassword';
// import AddEvent from './AddEvent';  // Import AddEvent
// import Confirm from './Confirm';  // Import Confirm
// import WeeklyCalendar from './WeeklyCalendar';  // Import WeeklyCalendar (if it is used as a standalone screen)

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="LoginPage">
//       <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }} />
//       <Stack.Screen name="SignUp" component={SignUpPage} options={{ title: 'Sign Up' }} />
//       <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} options={{ title: 'Forgot Password' }} />
//       <Stack.Screen name="CreateAccountSuccessful" component={CreateAccountSuccessful} options={{ title: 'Create Account Successful' }} />
//       <Stack.Screen name="ResetPasswordViaEmail" component={ResetPasswordViaEmail} options={{ title: 'Reset Password via Email' }} />
//       <Stack.Screen name="ResetPasswordViaPhone" component={ResetPasswordViaPhone} options={{ title: 'Reset Password via Phone' }} />
//       <Stack.Screen name="ResetNewPassword" component={ResetNewPassword} options={{ title: 'Reset New Password' }} />
//       <Stack.Screen name="AddEvent" component={AddEvent} options={{ title: 'Add Event' }} />
//       <Stack.Screen name="Confirm" component={Confirm} options={{ title: 'Confirm Event' }} />
//       <Stack.Screen name="WeeklyCalendar" component={WeeklyCalendar} options={{ title: 'Weekly Calendar' }} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import CreateAccountSuccessful from "./CreateAccountSuccessful";
import ResetPasswordViaEmail from "./ResetPasswordViaEmail";
import ResetPasswordViaPhone from "./ResetPasswordViaPhone";
import ResetNewPassword from "./ResetNewPassword";
import { useAuth } from "./auth/authHooks";
import { ActivityIndicator, View } from "react-native";
import Dashboard from "./Dashboard";

const Stack = createStackNavigator();

// Pages for the login/registration pages
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginPage">
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{ title: "Sign Up" }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPage}
        options={{ title: "Forgot Password" }}
      />
      <Stack.Screen
        name="CreateAccountSuccessful"
        component={CreateAccountSuccessful}
        options={{ title: "Create Account Successful" }}
      />
      <Stack.Screen
        name="ResetPasswordViaEmail"
        component={ResetPasswordViaEmail}
        options={{ title: "ResetPasswordViaEmail" }}
      />
      <Stack.Screen
        name="ResetPasswordViaPhone"
        component={ResetPasswordViaPhone}
        options={{ title: "ResetPasswordViaPhone" }}
      />
      <Stack.Screen
        name="ResetNewPassword"
        component={ResetNewPassword}
        options={{ title: "ResetNewPassword" }}
      />
    </Stack.Navigator>
  );
};

// Pages for the rest of the app, when the user is logged in
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />
    </Stack.Navigator>
  );
};

// Determines whether the user is logged in or not, if yes then goes to the Dashboard, if not then goes to the login.
const AppNavigator = () => {
  const { currentUser } = useAuth();

  return currentUser ? <AppStack /> : <AuthStack />;
};
export default AppNavigator;
