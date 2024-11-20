
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TripCard = ({ trip }) => {
    const navigation = useNavigation();

    // Format the start and end dates
    const formatDate = (date) => {
        if (!date) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const handlePress = () => {
        navigation.navigate('TripEditorScreen', { tripId: trip.id });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.header}>
                <Text style={styles.title}>{trip.title}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{formatDate(trip.startDate)}</Text>
                    <Text style={styles.dateText}>- {formatDate(trip.endDate)}</Text>
                </View>
            </View>
            <Text style={styles.description}>{trip.description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: 'row',
    },
    dateText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
});

export default TripCard;
