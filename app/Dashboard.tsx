// Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard Page</Text>
    </View>
  );
};

/*
import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Calendar } from 'react-native-calendars';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
    // ScrollView for scrollable content
      {}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title in the upper left corner }
        <Text style={styles.h1}>Welcome to TripTrails!</Text>

        {/* Subtitle }
        <Text style={styles.h2}>
          Your New Adventure Starts Here!
        </Text>

        {/* Calendar Component }
        <View style={styles.calendarContainer}>
          <Calendar
            current={new Date().toISOString().split('T')[0]}
            minDate={'2020-05-10'}
            maxDate={'2025-05-30'}
            monthFormat={'MM / yyyy'}
            hideArrows={false}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation - Fixed at the bottom }
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Recommend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Add Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevent overlap with the fixed nav bar
  },
  paragraph: {
    margin: 8,
    fontSize: 16,
    textAlign: "center",
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "left",
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarContainer: {
    width: '90%',
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Set height for the navigation bar
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#808080",
    paddingVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
});
export default Dashboard;

