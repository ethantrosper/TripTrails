import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TripCard from './TripCard';
import { useAuth } from './auth/authHooks'; // Hook to get the current authenticated user
import { getAllUserTrips } from './storage/storage'; // Method to fetch trips for a user

const TripShowcase = () => {
    const [trips, setTrips] = useState([]);
    const { getCurrentUser } = useAuth();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    const userTrips = await getAllUserTrips(user);
                    setTrips(userTrips);
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, []);

    return (
        <FlatList
            data={trips}
            keyExtractor={(item) => item.primaryKey}
            renderItem={({ item }) => <TripCard trip={item} />}
            contentContainerStyle={styles.list}
        />
    );
};
//
const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
    },
});

export default TripShowcase;
