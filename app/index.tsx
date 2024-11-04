// index.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { RealmProvider } from "@realm/react";
import { realmConfig } from "./storage/config";
import { AuthProvider } from "./auth/authHooks";

const App = () => {
  return (
    <RealmProvider {...realmConfig}>
      <AuthProvider>
        <NavigationContainer independent={true}>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </RealmProvider>
  );
};

export default App;
