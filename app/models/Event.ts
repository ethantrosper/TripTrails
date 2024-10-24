import Realm, { ObjectSchema } from "realm";

export class Event extends Realm.Object<Event> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  description!: string;
  note?: string;
  location!: string;
  eventDate!: Date;
  eventTimeStart?: Date;
  eventTimeEnd?: Date;
  createdAt: Date = new Date();
  isComplete = false;
  category?: string;
  mapUrl?: string;
  alertDate?: Date;
  alert: boolean = false;

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "Event",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      location: "string",
      description: "string",
      eventDate: "date",
      category: "string",
      mapUrl: "string",
      eventTimeStart: "date",
      eventTimeEnd: "date",
      note: "string",
      alertDate: "date",
      alert: "bool",
      createdAt: {
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
