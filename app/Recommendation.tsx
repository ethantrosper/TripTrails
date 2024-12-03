import React from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import openMap from 'react-native-open-maps';

const Recommendation: React.FC = () => {

  const openOSM = () => {
    openMap({
      latitude: 37.7749,
      longitude: -122.4194,
      provider: undefined, // Use OpenStreetMap
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabTextSelected}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Entertainment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Shopping</Text>
        </TouchableOpacity>
      </View>

      {/* Recommendation List */}
      <ScrollView style={styles.scrollContainer}>
        {[{
          title: "McDonald's",
          description: "Description or Categorization of the place",
          rating: "5"
        }, {
          title: "Title",
          description: "Description or Categorization of the place",
          rating: "4.5"
        }, {
          title: "Title",
          description: "Description or Categorization of the place",
          rating: "4.4"
        }].map((item, index) => (
          <View key={index} style={styles.card}>
            <Image style={styles.image} source={require('../assets/images/react-logo.png')} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to trip</Text>
              </TouchableOpacity>
              <Text style={styles.rating}>{item.rating} ★</Text>
            </View>
            <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Button title="Open OpenStreetMap" onPress={openOSM} />
          </View>
          </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabButton: {
    padding: 16,
  },
  tabTextSelected: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  addButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    fontSize: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
  },
  addButtonMain: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#c7a4ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 15,
  },
  addButtonMainText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Recommendation