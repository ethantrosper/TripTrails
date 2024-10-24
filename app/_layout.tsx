import { Stack } from "expo-router";
import { RealmProvider } from "@realm/react";
import { Event } from "./models/Event";
import { Trip } from "./models/Trip";
import { User } from "./models/User";
import { Test } from "./models/Test";
import { useEffect } from "react";
import { initializeRealm } from "./storage/storage";
import { realmConfig } from "./storage/config";

export default function RootLayout() {
  useEffect(() => {
    const setupRealm = async () => {
      try {
        await initializeRealm();
      } catch (error) {
        console.error("Failed to initialize Realm:", error);
      }
    };

    setupRealm();
  }, []);

  return (
    <RealmProvider {...realmConfig}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </RealmProvider>
  );
}
