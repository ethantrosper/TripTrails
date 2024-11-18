import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import WeeklyCalendar from './WeeklyCalendar';

const AddEvent = () => {
  const navigation = useNavigation();
  const [tripName, setTripName] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeLocation, setPlaceLocation] = useState('');
  const [category, setCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [alertEnabled, setAlertEnabled] = useState(false);

  const categories = [
    { label: 'Restaurant', value: 'Restaurant', color: 'blue' },
    { label: 'Shopping', value: 'Shopping', color: 'red' },
    { label: 'Cafe', value: 'Cafe', color: 'green' },
    { label: 'Attraction', value: 'Attraction', color: 'yellow' },
    { label: 'Custom', value: 'Custom', color: 'gray' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString());
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const monthIndex = months.indexOf(selectedMonth);
      const year = parseInt(selectedYear, 10);
      let numberOfDays = 31;

      if (monthIndex === 1) {
        // February: check for leap year
        numberOfDays = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
      } else if ([3, 5, 8, 10].includes(monthIndex)) {
        // April, June, September, November have 30 days
        numberOfDays = 30;
      }

      const newDays = Array.from({ length: numberOfDays }, (_, i) => (i + 1).toString().padStart(2, '0'));
      setDays(newDays);
    } else {
      setDays([]); // If either year or month is not selected, reset the days
    }
  }, [selectedYear, selectedMonth]);

  // Get the selected category color
  const selectedCategoryColor = category ? categories.find(cat => cat.value === category)?.color : 'green';

  // Get selected date in New York time
  const selectedDate = selectedYear && selectedMonth && selectedDay
    ? new Date(`${selectedYear}-${(months.indexOf(selectedMonth) + 1).toString().padStart(2, '0')}-${selectedDay}T00:00:00`)
    : null;

  let selectedWeekday = null;
  if (selectedDate) {
    const newYorkFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
    });
    const formattedDate = newYorkFormatter.format(selectedDate);
    const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(formattedDate);
    selectedWeekday = weekdayIndex;
  }

  // Handle changing the time slots
  const handleTimeSlotChange = (slotIdentifier: string) => {
    setSelectedTimeSlots((prevSlots) => {
      if (prevSlots.includes(slotIdentifier)) {
        return prevSlots.filter((slot) => slot !== slotIdentifier);
      } else {
        return [...prevSlots, slotIdentifier];
      }
    });
  };

  // Handle resetting all time slots
  const handleResetTimeSlots = () => {
    setSelectedTimeSlots([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Trip Name"
        value={tripName}
        onChangeText={setTripName}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>Place Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Place Name"
        value={placeName}
        onChangeText={setPlaceName}
      />

      <Text style={styles.label}>Place Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Place location"
        value={placeLocation}
        onChangeText={setPlaceLocation}
      />

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {categories.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <View style={styles.alertContainer}>
        <Text style={styles.label}>Alert Me</Text>
        <Switch
          value={alertEnabled}
          onValueChange={(value) => { setAlertEnabled(value); if (value) { alert('You will be notified about the selected event!'); } }}
        />
      </View>

      <Text style={styles.label}>Trip Dates</Text>
      <View style={styles.datePickerContainer}>
        <Picker
          selectedValue={selectedYear}
          style={styles.yearPicker}
          onValueChange={(itemValue) => {
            setSelectedYear(itemValue);
            setSelectedDay(''); // Reset day when year changes
          }}
        >
          <Picker.Item label="Year" value="" />
          {years.map((year, index) => (
            <Picker.Item key={index} label={year} value={year} style={styles.pickerItemText} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedMonth}
          style={styles.monthPicker}
          onValueChange={(itemValue) => {
            setSelectedMonth(itemValue);
            setSelectedDay(''); // Reset day when month changes
          }}
        >
          <Picker.Item label="Month" value="" />
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={month} style={styles.pickerItemText} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedDay}
          style={styles.dayPicker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          <Picker.Item label="Day" value="" />
          {days.map((day, index) => (
            <Picker.Item key={index} label={day} value={day} style={styles.pickerItemText} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Available Times</Text>
      <WeeklyCalendar
        selectedTimeSlots={selectedTimeSlots}
        onTimeSlotChange={handleTimeSlotChange}
        highlightedDay={selectedWeekday} // Pass calculated selectedWeekday
        selectedCategoryColor={selectedCategoryColor} // Pass selected category color
      />

      <View style={[styles.buttonContainer, { marginTop: 30 }]}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetTimeSlots}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Confirm', {
            tripName,
            placeName,
            placeLocation,
            category: category ? categories.find((cat) => cat.value === category)?.label : 'N/A',
            selectedDate: selectedDate ? `${selectedMonth} ${selectedDay}, ${selectedYear}` : 'N/A',
            selectedTimeSlots,
            alertEnabled,
          })
        }
      >
        <Text style={styles.buttonText}>Confirm</Text>
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  yearPicker: {
    flex: 1,
    marginHorizontal: 3,
    height: 40,
  },
  monthPicker: {
    flex: 1.3,
    marginHorizontal: 3,
    height: 40,
  },
  dayPicker: {
    flex: 0.9,
    marginHorizontal: 3,
    height: 40,
  },
  pickerItemText: {
    fontSize: 12,
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#5A5260',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 100,
  },
  button: {
    backgroundColor: '#5A5260',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 5,
    backgroundColor: '#ccc',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
});

export default AddEvent;
