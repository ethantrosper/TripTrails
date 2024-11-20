
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getRealm, insertTrip } from './storage/storage';
import { useAuth } from './auth/authHooks';

const COLOR_SWATCHES = [
  '#FF5733', '#33FF57', '#3357FF', '#F5A623', '#8E44AD',
  '#E74C3C', '#3498DB', '#1ABC9C', '#F39C12', '#2C3E50',
];

const AddTrip = () => {
  const [tripName, setTripName] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeLocation, setPlaceLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripColor, setTripColor] = useState(COLOR_SWATCHES[0]); // Default color
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const navigation = useNavigation();
  const { currentUser } = useAuth();

  const handleAddTrip = async () => {
    if (!tripName || !placeName || !placeLocation || !startDate || !endDate) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const realm = getRealm();
      await insertTrip(
        realm,
        currentUser,
        tripName,
        placeLocation,
        new Date(startDate),
        new Date(endDate),
        placeName,
        tripColor
      );
      Alert.alert('Success', 'Trip added successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
      ]);
    } catch (error) {
      console.error('Error adding trip:', error);
      Alert.alert('Error', 'Could not add trip. Please try again later.');
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : 'Select Date';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add a New Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Trip Name"
        value={tripName}
        onChangeText={setTripName}
      />
      <TextInput
        style={styles.input}
        placeholder="Place Name"
        value={placeName}
        onChangeText={setPlaceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Place Location"
        value={placeLocation}
        onChangeText={setPlaceLocation}
      />
      <Text style={styles.label}>Start Date:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(startDate)}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      <Text style={styles.label}>End Date:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(endDate)}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}
      <Text style={styles.label}>Trip Color:</Text>
      <View style={styles.colorSwatchContainer}>
        {COLOR_SWATCHES.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorSwatch,
              { backgroundColor: color },
              color === tripColor ? styles.selectedColorSwatch : null,
            ]}
            onPress={() => setTripColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddTrip}>
        <Text style={styles.buttonText}>Add Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 },
  label: { fontSize: 16, marginVertical: 10 },
  dateButton: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 5, marginBottom: 20 },
  dateText: { fontSize: 16, color: '#333' },
  colorSwatchContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  colorSwatch: { width: 40, height: 40, borderRadius: 20, margin: 5 },
  selectedColorSwatch: { borderWidth: 3, borderColor: '#000' },
  button: { backgroundColor: '#5A5260', paddingVertical: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AddTrip;


/*
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
import Confirm from './Confirm';

const AddTrip = () => {
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

export default AddTrip;
*/