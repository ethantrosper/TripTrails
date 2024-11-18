import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Recommendation from './Recommendation';
import AddEvent from './AddEvent';
import Search from './Search';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'; 


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


const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = ''; // Define iconName as a string

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Recommendation') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'AddEvent') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5A5260',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: true, 
          tabBarLabelStyle: { fontSize: 10 }, 
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'Dashboard' }} />
        <Tab.Screen name="Recommendation" component={Recommendation} options={{ tabBarLabel: 'Recommendation' }} />
        <Tab.Screen name="AddEvent" component={AddEvent} options={{ tabBarLabel: 'Add Trip' }} />
        <Tab.Screen name="Search" component={Search} options={{ tabBarLabel: 'Search' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
/*
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
*/
export default AppNavigator;
