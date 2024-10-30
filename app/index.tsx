import React from 'react';
import { View, Text } from 'react-native';
import AddEvent from './AddEvent'; // Adjust the import path as per your folder structure

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <AddEvent />
    </View>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './AppNavigator';

// const App = () => {
//   return (
//     <NavigationContainer independent={true}>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default App;

