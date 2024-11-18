import Realm, { ObjectSchema } from "realm";
import { Trip } from "./Trip";

export class User extends Realm.Object<User> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  username!: string;
  password!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  trips!: Realm.List<Trip>;
  createdAt: Date = new Date();

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      createdAt: "date",
      username: "string",
      password: "string",
      email: "string",
      firstName: "string",
      lastName: "string",
      trips: {
        type: "list",
        objectType: "Trip",
      },
    },
  };
}
