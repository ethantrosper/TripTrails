// app/config/realmConfig.ts

import { Event } from "../models/Event";
import { Trip } from "../models/Trip";
import { User } from "../models/User";

export const realmConfig = {
  schema: [User, Trip, Event],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true, // Only use during development
};

//For migrations
/*
const realmConfig = {
  schema: [User, Trip, Event],
  schemaVersion: 1, // Increment this when you make schema changes
  migration: (oldRealm, newRealm) => {
    // Get all objects from the old schema
    const oldObjects = oldRealm.objects('User');
    const newObjects = newRealm.objects('User');

    // Loop through all objects and migrate them
    for (let i = 0; i < oldObjects.length; i++) {
      // Set default values for new properties
      newObjects[i].username = oldObjects[i].username || '';
      newObjects[i].password = oldObjects[i].password || '';
    }
  }
};
*/
