import React from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.h1}>Welcome to TripTrails!</Text>
        <Text style={styles.h2}>
          Start editing to see some magic happen, even on your mobile device!
        </Text>

        {/* Add spacing using styles instead of <br /> */}
        <Text style={styles.paragraph}>
          Open Expo on your mobile device by scanning the QR code in the
          application log under the start tab.
        </Text>

        {/* Bottom Navigation - React Native Style */}
        <View style={styles.bottomNavContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>Recommend</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
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
    textAlign: "center",
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNavContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
  },
});
