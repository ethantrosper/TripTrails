import Realm, { ObjectSchema } from "realm";
import { Event } from "./Event";

export class Trip extends Realm.Object<Trip> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description?: string;
  location!: string;
  events!: Realm.List<Event>;
  tripColor?: string;
  isComplete: boolean = false;
  createdAt!: Date;
  startDate!: Date;
  endDate!: Date;

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "Trip",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId",
        default: () => new Realm.BSON.ObjectId(),
      },
      title: "string",
      description: "string?",
      location: "string",
      tripColor: "string?",
      isComplete: {
        type: "bool",
        default: false,
        indexed: true,
      },
      createdAt: {
        type: "date",
        default: () => new Date(),
      },
      startDate: "date",
      endDate: "date",
      events: {
        type: "list",
        objectType: "Event",
      },
    },
  };
}
