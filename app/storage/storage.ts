import { Realm } from "@realm/react";
import { Test } from "../models/Test";

export const insertTest = (realm: Realm): Promise<Test> => {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newTest = realm.create<Test>("Test", {
          _id: new Realm.BSON.ObjectId(),
          description: `Test item ${Date.now()}`,
        });
        resolve(newTest);
      });
    } catch (error) {
      console.error("Error creating Test:", error);
      reject(error);
    }
  });
};

export const getLastInsertedTest = (realm: Realm): Test | null => {
  const allTests = realm.objects<Test>("Test").sorted("_id", true);
  return allTests.length > 0 ? allTests[0] : null;
};

export const getAllTests = (realm: Realm): Realm.Results<Test> => {
  return realm.objects<Test>("Test").sorted("_id", true);
};
