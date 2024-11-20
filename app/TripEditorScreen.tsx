import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTripById, updateTrip } from './storage/storage'; // Assume these methods are defined in storage.ts

const TripEditorScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { tripId } = route.params; // Get the trip ID from navigation params

    const [tripName, setTripName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const trip = await getTripById(tripId);
                if (trip) {
                    setTripName(trip.name);
                    setDescription(trip.description);
                    setStartDate(trip.startDate);
                    setEndDate(trip.endDate);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to load trip details.');
                console.error(error);
            }
        };

        fetchTrip();
    }, [tripId]);

    const handleSave = async () => {
        try {
            await updateTrip(tripId, {
                name: tripName,
                description,
                startDate,
                endDate,
            });
            Alert.alert('Success', 'Trip details updated successfully.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update trip details.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Trip Name:</Text>
            <TextInput
                style={styles.input}
                value={tripName}
                onChangeText={setTripName}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.label}>Start Date:</Text>
            <TextInput
                style={styles.input}
                value={startDate}
                onChangeText={setStartDate}
            />
            <Text style={styles.label}>End Date:</Text>
            <TextInput
                style={styles.input}
                value={endDate}
                onChangeText={setEndDate}
            />
            <Button title="Save Changes" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 14,
    },
});

export default TripEditorScreen;
