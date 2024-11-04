import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { RealmProvider } from "@realm/react";
import { realmConfig } from "./storage/config";
import { initializeRealm, closeRealm } from "./storage/storage";
import { useAuth } from "./auth/authHooks";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const { initialize } = useAuth();

  useEffect(() => {
    const setupApp = async () => {
      try {
        const realm = await initializeRealm();
        initialize(realm);
      } catch (error) {
        console.error("Failed to initialize Realm:", error);
      }
    };

    setupApp();

    return () => {
      closeRealm();
    };
  }, [initialize]);

  return (
    <RealmProvider {...realmConfig}>
      <NavigationContainer independent={true}>
        <AppNavigator />
      </NavigationContainer>
    </RealmProvider>

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
