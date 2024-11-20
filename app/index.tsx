import { View, Text } from 'react-native';
import AddTrip from './AddTrip'; // Adjust the import path as per your folder structure
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { RealmProvider } from "@realm/react";
import { realmConfig } from "./storage/config";
import { AuthProvider } from "./auth/authHooks";

/*
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator/>
    </View>
  );
}
}
*/

const App = () => {
  return(
    <RealmProvider {...realmConfig}>
      <AuthProvider>
          <AppNavigator />
      </AuthProvider>
    </RealmProvider>
  );
};

export default App;
