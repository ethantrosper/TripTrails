import Realm, { ObjectSchema } from "realm";

export class Test extends Realm.Object<Test> {
  _id!: Realm.BSON.ObjectId;
  description!: string;

  static schema: ObjectSchema = {
    name: "Test",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      description: "string",
    },
  };
}
