import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Recommendation from './Recommendation';
import AddEvent from './AddEvent';
import Search from './Search';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = ''; // Define iconName as a string

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Recommendation') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'AddEvent') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5A5260',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: true, 
          tabBarLabelStyle: { fontSize: 10 }, 
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: 'Dashboard' }} />
        <Tab.Screen name="Recommendation" component={Recommendation} options={{ tabBarLabel: 'Recommendation' }} />
        <Tab.Screen name="AddEvent" component={AddEvent} options={{ tabBarLabel: 'Add Trip' }} />
        <Tab.Screen name="Search" component={Search} options={{ tabBarLabel: 'Search' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
