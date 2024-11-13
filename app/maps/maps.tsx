import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { formatGoogleMapUrl } from "./mapEndpoints";
import * as Linking from "expo-linking";

interface MapProps {
  placeName: string;
}

export const GoogleMapButton = (props: MapProps) => {
  //   const [coordinates, setCoordinates] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const url = formatGoogleMapUrl(props.placeName);
    setMapUrl(url);
  }, [props.placeName]);

  if (!mapUrl) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const openInGoogleMaps = async () => {
    try {
      const canOpen = await Linking.canOpenURL(mapUrl);
      if (canOpen) {
        await Linking.openURL(mapUrl);
      } else {
        // Handle case where Google Maps isn't installed
        // You might want to show an alert or open in browser instead
        const browserUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.placeName)}`;
        await Linking.openURL(browserUrl);
      }
    } catch (error) {
      console.error("Error opening Google Maps:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openInGoogleMaps}>
      <Text style={styles.buttonText}>{"Open in Google Maps"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 160,
    maxWidth: 250,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
