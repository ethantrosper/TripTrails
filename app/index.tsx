import React, { useCallback, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useRealm } from "@realm/react";
import { Test } from "./models/Test";
import { insertTest, getLastInsertedTest } from "./storage/storage";

export default function Index() {
  const realm = useRealm();
  const [lastInsertedTest, setLastInsertedTest] = useState<Test | null>(null);

  const handleInsertTest = useCallback(() => {
    insertTest(realm)
      .then((newTest) => {
        setLastInsertedTest(newTest);
        Alert.alert("Success", "New test item inserted successfully");
      })
      .catch((error) => {
        console.error("Error inserting test:", error);
        Alert.alert("Error", "Failed to insert new test item");
      });
  }, [realm]);

  const handleDisplayTests = useCallback(() => {
    const lastTest = getLastInsertedTest(realm);
    setLastInsertedTest(lastTest);
    if (!lastTest) {
      Alert.alert("Info", "No test items found");
    }
  }, [realm]);

  return (
    <View style={styles.container}>
      <Button title="Insert Test Item" onPress={handleInsertTest} />
      <Button title="Display Last Inserted Test" onPress={handleDisplayTests} />
      {lastInsertedTest && (
        <View style={styles.testItem}>
          <Text>Last Inserted Test:</Text>
          <Text>ID: {lastInsertedTest._id.toHexString()}</Text>
          <Text>Description: {lastInsertedTest.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  testItem: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});
