 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <AppNavigator />
    </NavigationContainer>
 
    /*
import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Go to Dashboard" onPress={() => router.push("/Dashboard")} />
    </View>
    */
 
  );
};

export default App;