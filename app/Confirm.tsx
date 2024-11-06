import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
  tripName?: string;
  placeName?: string;
  placeLocation?: string;
  category?: string;
  selectedDate?: string;
  selectedTimeSlots?: string[];
};

const Confirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    tripName = 'N/A',
    placeName = 'N/A',
    placeLocation = 'N/A',
    category = 'N/A',
    selectedDate = 'N/A',
    selectedTimeSlots = [],
  } = (route.params as RouteParams) || {};

  // Generate a summary of selected time slots in order from morning to evening
  const summarizeTimeSlots = (timeSlots: string[]) => {
    if (timeSlots.length === 0) return 'N/A';
  
    const sortedTimeSlots = timeSlots.sort((a, b) => {
      const [dayA, timeA] = a.split('-').map(part => part.trim());
      const [dayB, timeB] = b.split('-').map(part => part.trim());
  
      // Sort by day first
      if (dayA !== dayB) {
        return dayA.localeCompare(dayB);
      }
  
      // Extract hour, minute, and period (AM/PM) for comparison
      const [hourA, minuteA] = timeA.split(' ')[0].split(':').map(Number);
      const periodA = timeA.split(' ')[1];
      const [hourB, minuteB] = timeB.split(' ')[0].split(':').map(Number);
      const periodB = timeB.split(' ')[1];
  
      // Sort "AM" before "PM"
      if (periodA !== periodB) {
        return periodA === 'AM' ? -1 : 1;
      }
  
      // Sort by hour, adjusting for 12-hour format (12 AM is less than 1 AM, etc.)
      const adjustedHourA = hourA === 12 ? 0 : hourA;
      const adjustedHourB = hourB === 12 ? 0 : hourB;
  
      if (adjustedHourA !== adjustedHourB) {
        return adjustedHourA - adjustedHourB;
      }
  
      // Sort by minute if hours are the same
      return minuteA - minuteB;
    });
  
    return sortedTimeSlots.join('\n');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Trip Successfully!</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Trip Name:</Text>
        <Text style={styles.value}>{tripName}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Place Name:</Text>
        <Text style={styles.value}>{placeName}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Place Location:</Text>
        <Text style={styles.value}>{placeLocation}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{category}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Trip Date:</Text>
        <Text style={styles.value}>{selectedDate}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Selected Time Slots:</Text>
        <Text style={styles.value}>{summarizeTimeSlots(selectedTimeSlots)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#5A5260',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Confirm;
