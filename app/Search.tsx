import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class SearchPage extends React.Component {
  state = {
    searchQuery: ""
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
    // Implement search functionality here
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for trips, locations, or activities..."
            value={this.state.searchQuery}
            onChangeText={this.handleSearch}
          />
        </View>

        {/* ScrollView for scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Title in the upper left corner */}
          <Text style={styles.h1}></Text>

          {/* Subtitle */}
          <Text style={styles.h2}>
            Your New Adventure Starts Here!
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevent overlap with the fixed nav bar
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
