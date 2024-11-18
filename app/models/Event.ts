import Realm, { ObjectSchema } from "realm";

export class Event extends Realm.Object<Event> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description?: string;
  note?: string;
  location!: string;
  eventDate!: Date;
  eventTimeStart?: Date;
  eventTimeEnd?: Date;
  createdAt!: Date;
  isComplete: boolean = false;
  category?: string;
  mapUrl?: string;
  alertDate?: Date;
  alert?: boolean;

  static primaryKey = "_id";
  static schema: ObjectSchema = {
    name: "Event",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId",
        default: () => new Realm.BSON.ObjectId(),
      },
      title: "string",
      description: "string?",
      note: "string?",
      location: "string",
      eventDate: "date",
      eventTimeStart: "date?",
      eventTimeEnd: "date?",
      createdAt: {
        type: "date",
        default: () => new Date(),
      },
      isComplete: {
        type: "bool",
        default: false,
        indexed: true,
      },
      category: "string?",
      mapUrl: "string?",
      alertDate: "date?",
      alert: "bool?",
    },
  };
}
