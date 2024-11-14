import { Realm } from "@realm/react";
import { Test } from "../models/Test";
import { Trip } from "../models/Trip";
import { User } from "../models/User";
import { Event } from "../models/Event";
import { realmConfig } from "./config";

// DATABASE FUNCTIONS
let realm: Realm;

export const initializeRealm = async () => {
  try {
    if (!realm || realm.isClosed) {
      realm = await Realm.open(realmConfig);
    }
    return realm;
  } catch (error) {
    console.error("Failed to initialize Realm:", error);
    throw error;
  }
};

export const getRealm = () => {
  if (!realm) {
    throw new Error(
      "Realm has not been initialized. Call initializeRealm first.",
    );
  }
  if (realm.isClosed) {
    throw new Error("Realm is closed. You may need to reinitialize it.");
  }
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
  username: string, // required
  password: string, // required
): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject(new Error("Username and password are required"));
      return;
    }
    try {
      realm.write(() => {
        const newUser = realm.create<User>("User", {
          _id: new Realm.BSON.ObjectId(),
          username,
          password,
          createdAt: new Date(),
          trips: [],
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
  title: string, // required
  location: string, // required
  startDate: Date, // required
  endDate: Date, // required
  description?: string, // optional
  tripColor?: string, // optional
): Promise<Trip> => {
  return new Promise((resolve, reject) => {
    // Validate required fields
    if (!title || !location || !startDate || !endDate) {
      reject(new Error("Title, location, startDate, and endDate are required"));
      return;
    }
    try {
      realm.write(() => {
        const newTrip = realm.create<Trip>("Trip", {
          _id: new Realm.BSON.ObjectId(),
          title,
          location,
          description,
          tripColor,
          startDate,
          endDate,
          createdAt: new Date(),
          isComplete: false,
          events: [],
        });
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
  title: string, // required
  location: string, // required
  eventDate: Date, // required
  eventTimeStart?: Date, // optional
  description?: string, // optional
  note?: string, // optional
  eventTimeEnd?: Date, // optional
  category?: string, // optional
  mapUrl?: string, // optional
  alertDate?: Date, // optional
  alert?: boolean, // optional
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    if (!location || !eventDate) {
      reject(new Error("Location and eventDate are required"));
      return;
    }
    try {
      realm.write(() => {
        const newEvent = realm.create<Event>("Event", {
          _id: new Realm.BSON.ObjectId(),
          title,
          location,
          eventDate,
          eventTimeStart,
          description,
          note,
          eventTimeEnd,
          category,
          mapUrl,
          alertDate,
          alert,
          createdAt: new Date(),
          isComplete: false,
        });
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
