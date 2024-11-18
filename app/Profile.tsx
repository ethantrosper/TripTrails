import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [email, setEmail] = useState("johndoe@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Generate the last 5 years in descending order
  const getLastFiveYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, index) => currentYear - index);
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
      }
    });
  };

  const handleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };

  const handleEmailEdit = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const saveName = () => {
    if (name.trim() === "") {
      Alert.alert("Name cannot be empty");
    } else {
      setIsEditingName(false);
    }
  };

  const saveEmail = () => {
    if (email.trim() === "") {
      Alert.alert("Email cannot be empty");
    } else {
      setIsEditingEmail(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {/* Name Section */}
          {isEditingName ? (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              onSubmitEditing={saveName}
              onBlur={saveName}
              autoFocus={true}
            />
          ) : (
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <TouchableOpacity onPress={handleNameEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Email Section */}
          {isEditingEmail ? (
            <TextInput
              style={styles.emailInput}
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={saveEmail}
              onBlur={saveEmail}
              autoFocus={true}
              keyboardType="email-address"
            />
          ) : (
            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>{email}</Text>
              <TouchableOpacity onPress={handleEmailEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* My Trips Section */}
        <View style={styles.aboutContainer}>
          <Text style={[styles.sectionTitle, { textDecorationLine: 'underline' }]}>My Trips</Text>
          {getLastFiveYears().map((year) => (
            <View key={year} style={styles.yearSection}>
              <Text style={[styles.yearHeader, { textDecorationLine: 'underline' }]}>
                {year}
              </Text>
              {/* Add trip content for each year here */}
              <Text style={styles.tripText}>Trip details for {year}</Text>
            </View>
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  headerContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#808080",
    marginRight: 10,
  },
  editText: {
    fontSize: 16,
    color: "#007bff",
  },
  nameInput: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#007bff",
    textAlign: "center",
    marginBottom: 10,
  },
  emailInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#007bff",
    textAlign: "center",
    color: "#808080",
    marginBottom: 10,
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  yearSection: {
    marginBottom: 20,
  },
  yearHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  tripText: {
    fontSize: 16,
    color: "#4f4f4f",
    marginBottom: 10,
  },
  settingsContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  settingButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  settingText: {
    fontSize: 16,
    color: "#007bff",
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
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
