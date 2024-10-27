import { Stack } from "expo-router";
import { RealmProvider } from "@realm/react";
import { Event } from "./models/Event";
import { Trip } from "./models/Trip";
import { User } from "./models/User";
import { Test } from "./models/Test";

export default function RootLayout() {
  return (

    <Stack>
      <Stack.Screen name="Welcome to TripTrails!" />
    </Stack>

  );
}
