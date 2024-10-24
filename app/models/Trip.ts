import Realm, { ObjectSchema } from "realm";
import { Event } from "./Event";

export class Trip extends Realm.Object<Trip, "description"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  location!: string;
  events!: Event[];
  description!: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  isComplete = false;

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "Trip",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      events: "Event[]",
      description: "string",
      createdAt: {
        type: "date",
        default: new Date(),
      },
      updatedAt: {
        type: "date",
        default: new Date(),
      },
      isComplete: {
        type: "bool",
        default: false,
        indexed: true,
      },
    },
  };
}
