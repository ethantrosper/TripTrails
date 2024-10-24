import { Realm } from "@realm/react";
import { Test } from "../models/Test";
import { Trip } from "../models/Trip";
import { User } from "../models/User";

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
export const insertUser = (realm: Realm, user: string, pass: string): Promise<Test> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newUser = realm.create<User>("User", {
          _id: new Realm.BSON.ObjectId(),
          username: user,
          password: pass,
          createdAt:Date.now(),
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
export const insertTrip = (realm: Realm, sentLocation: string, sentDescription: string): Promise<Test> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newTrip = realm.create<Trip>("Trip", {
          _id: new Realm.BSON.ObjectId(),
          location: sentLocation,
          description: sentDescription,
          createdAt:Date.now(),
        });
        resolve(newTrip);
      });
    } catch (error) {
      console.error("Error creating Trip:", error);
      reject(error);
    }
  });
};


export const getAllTrips = (realm: Realm): Realm.Results<Trip> => {
  return realm.objects<Trip>("Trip").sorted("_id", true);
};



// EVENT FUNCTIONS
export const insertEvent = (realm: Realm, sentLocation: string, sentDescription: string, date: Date): Promise<Test> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newTrip = realm.create<Event>("Event", {
          _id: new Realm.BSON.ObjectId(),
          description: sentDescription,
          location: sentLocation,
          eventDate: date,
          createdAt:Date.now(),
        });
        resolve(newTrip);
      });
    } catch (error) {
      console.error("Error creating Trip:", error);
      reject(error);
    }
  });
};
//FIX THIS
export const getAllTripvents = (realm: Realm, trip: string): Realm.Results<Trip> => {
  return realm.objects<Trip>("Trip").sorted("_id", true);
};

