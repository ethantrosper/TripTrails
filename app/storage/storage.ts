import { Realm } from "@realm/react";
import { Test } from "../models/Test";
import { Trip } from "../models/Trip";
import { User } from "../models/User";
import { Event } from "../models/Event";
import { realmConfig } from "./config";

// DATABASE FUNCTIONS
let realm: Realm;

export const initializeRealm = async () => {
  realm = await Realm.open(realmConfig);
  return realm;
};

export const closeRealm = () => {
  if (realm && !realm.isClosed) {
    realm.close();
  }
};

//TEST FUNCTIONS
export const insertTest = (realm: Realm): Promise<Test> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newTest = realm.create<Test>("Test", {
          _id: new Realm.BSON.ObjectId(),
          description: `Test item ${Date.now()}`,
        });
        resolve(newTest);
      });
    } catch (error) {
      console.error("Error creating Test:", error);
      reject(error);
    }
  });
};

export const getLastInsertedTest = (realm: Realm): Test | null => {
  const allTests = realm.objects<Test>("Test").sorted("_id", true);
  return allTests.length > 0 ? allTests[0] : null;
};

export const getAllTests = (realm: Realm): Realm.Results<Test> => {
  return realm.objects<Test>("Test").sorted("_id", true);
};

// USER FUNCTIONS
export const insertUser = (
  realm: Realm,
  user: string,
  pass: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newUser = realm.create<User>("User", {
          _id: new Realm.BSON.ObjectId(),
          username: user,
          password: pass,
          createdAt: new Date(),
        });
        resolve(newUser);
      });
    } catch (error) {
      console.error("Error creating User:", error);
      reject(error);
    }
  });
};

// TRIP FUNCTIONS
export const insertTrip = (
  realm: Realm,
  user: User,
  location: string,
  description: string,
): Promise<Trip> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newTrip = realm.create<Trip>("Trip", {
          _id: new Realm.BSON.ObjectId(),
          location,
          description,
          createdAt: new Date(),
        });
        // Add the trip to the user's trips list
        user.trips.push(newTrip);
        resolve(newTrip);
      });
    } catch (error) {
      console.error("Error creating Trip:", error);
      reject(error);
    }
  });
};

export const getUserTrips = (user: User): Realm.List<Trip> => {
  return user.trips;
};

// EVENT FUNCTIONS
export const insertEvent = (
  realm: Realm,
  trip: Trip,
  location: string,
  description: string,
  eventDate: Date,
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newEvent = realm.create<Event>("Event", {
          _id: new Realm.BSON.ObjectId(),
          description,
          location,
          eventDate,
          createdAt: new Date(),
        });
        // Add the event to the trip's events list
        trip.events.push(newEvent);
        resolve(newEvent);
      });
    } catch (error) {
      console.error("Error creating Event:", error);
      reject(error);
    }
  });
};
//FIX THIS
export const getTripEvents = (trip: Trip): Realm.List<Event> => {
  return trip.events;
};
