import axios from "axios";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Place {
  name: string;
  rating?: number;
  vicinity: string;
  place_id: string;
  opening_hours?: {
    open_now: boolean;
  };
  price_level?: number;
  user_ratings_total?: number;
}

export interface SearchResult {
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
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const getCoordinates = async (
  placeName: string,
): Promise<Coordinates | null> => {
  try {
    console.log("Fetching coordinates for:", placeName);

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${process.env.GOOGLE_MAP_KEY}`,
    );

    console.log(response.data);

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }
    throw new Error("Location not found");
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
};

export const getRecommendations = async (
  location: string,
  category: string,
  limit: number = 10,
): Promise<Place[]> => {
  try {
    // First get coordinates for the location
    const coordinates = await getCoordinates(location);

    if (!coordinates) {
      throw new Error("Could not get coordinates for the location");
    }

    // Types mapping for common categories
    const categoryMapping: { [key: string]: string } = {
      restaurants: "restaurant",
      entertainment: "amusement_park|movie_theater|casino|bowling_alley",
      shopping: "shopping_mall|department_store",
      nightlife: "night_club|bar",
      parks: "park",
      cafes: "cafe",
      museums: "museum",
      hotels: "lodging",
    };

    const mappedCategory = categoryMapping[category.toLowerCase()] || category;

    const API_KEY = process.env.GOOGLE_MAP_KEY;
    const radius = 5000; // 5km radius
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&radius=${radius}&type=${mappedCategory}&key=${API_KEY}`;

    const response = await axios.get(url);

    console.log(response.data);

    if (!response.data.results) {
      throw new Error("No results found");
    }

    // Process and format the results
    const places = response.data.results.slice(0, limit).map(
      (place: any): Place => ({
        name: place.name,
        rating: place.rating,
        vicinity: place.vicinity,
        place_id: place.place_id,
        opening_hours: place.opening_hours,
        price_level: place.price_level,
        user_ratings_total: place.user_ratings_total,
      }),
    );

    console.log("Places: ", places);

    return places;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
};

export const searchLocations = async (
  search: string,
  location: string,
  limit: number = 5,
): Promise<SearchResult[]> => {
  try {
    const searchQuery = `${search} in ${location}`;

    const API_KEY = process.env.GOOGLE_MAP_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      searchQuery,
    )}&key=${API_KEY}`;

    const response = await axios.get(url);

    if (!response.data.results || response.data.results.length === 0) {
      console.log("No results found for:", searchQuery);
      return [];
    }

    // Process and format the results
    const results = response.data.results.slice(0, limit).map(
      (place: any): SearchResult => ({
        name: place.name,
        formatted_address: place.formatted_address,
        place_id: place.place_id,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        opening_hours: place.opening_hours,
        price_level: place.price_level,
        types: place.types,
        geometry: {
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
        },
      }),
    );

    return results;
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};
export const formatGoogleMapUrl = (location: string): string => {
  let url = `https://maps.google.com/?q=`;
  url += location.replace(/[^a-zA-Z0-9]/g, "+").replace(/\++/g, "+");
  return url;
};
