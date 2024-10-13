import { Trip } from "../objects/Trip";
import { Event } from "../objects/Event";

import firestore from "@react-native-firebase/firestore";

// For offline functionality, call this for the get functions
async function bootstrap() {
  await firestore().settings({
    persistence: true, // disable offline persistence
  });
}

export function storeTrip(trip: Trip) {}

export function storeEvent(trip: Trip, event: Event) {}

export function getTrip(trip: string) {}

export function getEvent(event: string) {}
