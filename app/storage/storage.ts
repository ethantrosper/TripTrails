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
  title: string,
  location: string,
  description: string,
): Promise<Trip> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newTrip = realm.create<Trip>("Trip", {
          _id: new Realm.BSON.ObjectId(),
          title,
          location,
          description,
          createdAt: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          tripColor: "#007AFF", // Default color
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

export const updateTrip = (
  realm: Realm,
  trip: Trip,
  updates: Partial<{
    title: string;
    description: string;
    location: string;
    tripColor: string;
    isComplete: boolean;
    startDate: Date;
    endDate: Date;
  }>,
): Promise<Trip> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        Object.keys(updates).forEach((key) => {
          const updateKey = key as keyof typeof updates;
          if (updates[updateKey] !== undefined) {
            (trip[updateKey] as any) = updates[updateKey];
          }
        });
        resolve(trip);
      });
    } catch (error) {
      console.error("Error updating Trip:", error);
      reject(error);
    }
  });
};

export const getAllUserTrips = (user: User): Realm.List<Trip> => {
  return user.trips;
};

export const getTrip = (trip: Trip): Trip | null => {
  const selectedTrip = realm.objectForPrimaryKey<Trip>("Trip", trip._id);
  return selectedTrip;
};

export const deleteTrip = (trip: Trip) => {
  realm.write(() => {
    realm.delete(trip.events);
    realm.delete(trip);
  });
};

// EVENT FUNCTIONS
export const insertEvent = (
  realm: Realm,
  trip: Trip,
  description: string,
  note: string,
  location: string,
  eventDate: Date,
  eventTimeStart: Date,
  eventTimeEnd: Date,
  category: string,
  mapUrl: string,
  alertDate: Date,
  alert: boolean,
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newEvent = realm.create<Event>("Event", {
          _id: new Realm.BSON.ObjectId(),
          description,
          location,
          eventDate,
          category,
          mapUrl,
          eventTimeStart,
          eventTimeEnd,
          alertDate,
          alert,
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

export const updateEvent = (
  realm: Realm,
  event: Event,
  updates: Partial<{
    description: string;
    note: string;
    location: string;
    eventDate: Date;
    eventTimeStart: Date;
    eventTimeEnd: Date;
    isComplete: boolean;
    category: string;
    mapUrl: string;
    alertDate: Date;
    alert: boolean;
  }>,
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        Object.keys(updates).forEach((key) => {
          const updateKey = key as keyof typeof updates;
          if (updates[updateKey] !== undefined) {
            (event[updateKey] as any) = updates[updateKey];
          }
        });
        resolve(event);
      });
    } catch (error) {
      console.error("Error updating Event:", error);
      reject(error);
    }
  });
};

export const getAllTripEvents = (trip: Trip): Realm.List<Event> => {
  return trip.events;
};

export const getEvent = (event: Event): Event | null => {
  const selectedEvent = realm.objectForPrimaryKey<Event>("Event", event._id);
  return selectedEvent;
};

export const deleteEvent = (event: Event) => {
  realm.write(() => {
    realm.delete(event);
  });
};
