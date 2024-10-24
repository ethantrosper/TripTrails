import Realm, { ObjectSchema } from "realm";
import { Event } from "./Event";

export class Trip extends Realm.Object<Trip, "description"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  description!: string;
  location!: string;
  events!: Realm.List<Event>;
  tripColor!: string;
  isComplete = false;
  createdAt: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "Trip",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      createdAt: "date",
      title: "string",
      location: "string",
      startDate: "date",
      endDate: "date",
      tripColor: "string",
      isComplete: {
        type: "bool",
        default: false,
        indexed: true,
      },
      events: {
        type: "list",
        objectType: "Event",
      },
    },
  };
}
