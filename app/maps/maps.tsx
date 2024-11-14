import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import {
  formatGoogleMapUrl,
  getRecommendations,
  searchLocations,
} from "./mapEndpoints";
import * as Linking from "expo-linking";

interface Location {
  name: string;
  formatted_address: string;
  place_id: string;
  rating?: number;
  user_ratings_total?: number;
  opening_hours?: {
    open_now: boolean;
  };
  price_level?: number;
  types?: string[];
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
interface MapProps {
  placeName?: string;
  location?: string;
  search?: string;
  category?: string;
}

export const GoogleMapButton = (props: MapProps) => {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    if (props.placeName) {
      const url = formatGoogleMapUrl(props.placeName);
      setMapUrl(url);
    } else {
      console.error("Requires the name of a place.");
    }
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
        if (props.placeName) {
          const browserUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.placeName)}`;
          await Linking.openURL(browserUrl);
        } else console.error("Requires the name of a place.");
      }
    } catch (error) {
      console.error("Error opening Google Maps:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openInGoogleMaps}>
      <Text style={styles.buttonText}>{"Open in Google Maps"}</Text>
    </TouchableOpacity>
  );
};

const LocationCard = ({ location }: { location: Location }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{location.name}</Text>
    <Text style={styles.address}>{location.formatted_address}</Text>

    <View style={styles.ratingContainer}>
      {location.rating && (
        <View style={styles.ratingBox}>
          <Text style={styles.rating}>⭐ {location.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>
            ({location.user_ratings_total?.toLocaleString()} reviews)
          </Text>
        </View>
      )}

      {location.opening_hours && (
        <Text
          style={[
            styles.openStatus,
            { color: location.opening_hours.open_now ? "#2ecc71" : "#e74c3c" },
          ]}
        >
          {location.opening_hours.open_now ? "Open Now" : "Closed"}
        </Text>
      )}
    </View>

    {location.types && (
      <View style={styles.tagsContainer}>
        {location.types.slice(0, 3).map((type, index) => (
          <Text key={index} style={styles.tag}>
            {type.replace(/_/g, " ")}
          </Text>
        ))}
      </View>
    )}

    <View style={styles.buttonContainer}>
      <GoogleMapButton placeName={location.name} />
    </View>
  </View>
);

export const LocationsFlatList = (props: MapProps) => {
  const location = props.location || null;
  const search = props.search || null;
  const category = props.category || null;

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        if (location && search) {
          const results = await searchLocations(search, location);
          setLocations(results);
        } else if (location && category) {
          const results = await getRecommendations(location, category);
          setLocations(results);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [location, search, category]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (locations.length === 0) {
    return <Text style={styles.noResults}>No results found</Text>;
  }

  return (
    <FlatList
      data={locations}
      keyExtractor={(item) => item.place_id}
      renderItem={({ item }) => <LocationCard location={item} />}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
  },
  openStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  buttonContainer: {
    alignItems: "center",
  },
  separator: {
    height: 16,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
