import { Trip } from "../objects/Trip";
import { Event } from "../objects/Event";

import firestore from "@react-native-firebase/firestore";

// For offline functionality, call this for the get functions
async function bootstrap() {
  await firestore().settings({
    persistence: true, // disable offline persistence
  });
}

export function storeTrip(trip: Trip) {
  console.log(trip);
}

export function storeEvent(trip: Trip, event: Event) {
  console.log(trip);
  console.log(event);
}

export function getTrip(trip: string) {
  bootstrap()
    .then(() => {
      console.log(trip);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getEvent(event: string) {
  bootstrap()
    .then(() => {
      console.log(event);
    })
    .catch((error) => {
      console.log(error);
    });
}