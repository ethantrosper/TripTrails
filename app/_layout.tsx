import { Stack } from "expo-router";
import { RealmProvider } from "@realm/react";
import { Event } from "./models/Event";
import { Trip } from "./models/Trip";
import { User } from "./models/User";
import { Test } from "./models/Test";

export default function RootLayout() {
  return (
    <RealmProvider schema={[Event, Trip, User, Test]}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </RealmProvider>
  );
}
