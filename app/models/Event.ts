import Realm, { ObjectSchema } from "realm";

export class Event extends Realm.Object<Event> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  description!: string;
  location!: string;
  eventDate!: Date;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  isComplete = false;
  tripId: Realm.BSON.ObjectId;

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "Event",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
      eventDate: {
        type: "date",
        default: new Date(),
      },
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
      //need to do this when i actually have a dev environment with Realm
      tripId: {
        
      }
    },
  };
}
