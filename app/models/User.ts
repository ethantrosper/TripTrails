import Realm, { ObjectSchema } from "realm";
import { Trip } from "./Trip";

export class User extends Realm.Object<User> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  Trips!: Trip[];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
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
