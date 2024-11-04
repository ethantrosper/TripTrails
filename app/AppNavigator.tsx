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
