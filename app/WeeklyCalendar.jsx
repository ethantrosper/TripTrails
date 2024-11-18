import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const WeeklyCalendar = ({ selectedTimeSlots, onTimeSlotChange, highlightedDay, selectedCategoryColor }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = [
    '0:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', 
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', 
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', 
  ];

  const toggleTimeSlot = (day, time) => {
    const slotIdentifier = `${day}-${time}`;
    onTimeSlotChange(slotIdentifier);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.calendarContainer}>
        <View style={styles.headerRow}>
          <View style={styles.timeCell} />
          {days.map((day, index) => (
            <View
              key={day}
              style={[
                styles.dayHeaderCell,
                highlightedDay === index && styles.highlightedDayHeaderCell,
              ]}
            >
              <Text style={styles.headerText}>{day}</Text>
            </View>
          ))}
        </View>

        {timeSlots.map((time) => (
          <View key={time} style={styles.row}>
            <View style={styles.timeCell}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
            {days.map((day, index) => {
              const slotIdentifier = `${day}-${time}`;
              const isSelected = selectedTimeSlots.includes(slotIdentifier);
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.cell,
                    isSelected && { backgroundColor: selectedCategoryColor || '#90ee90' },
                    highlightedDay === index && styles.highlightedCell,
                  ]}
                  onPress={() => toggleTimeSlot(day, time)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
  },
  dayHeaderCell: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  highlightedDayHeaderCell: {
    backgroundColor: '#5A5260',
  },
  headerText: {
    fontWeight: 'bold',
  },
  timeCell: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeText: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  highlightedCell: {
    borderColor: '#5A5260',
    borderWidth: 2,
  },
});

export default WeeklyCalendar;
