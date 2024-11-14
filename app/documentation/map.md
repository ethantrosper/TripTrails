# Maps

## Components and Functions

### Components

The main components you can use are:

- **`<GoogleMapButton />`**  
  Displays a button for a specified place.  
  **Props:**

  - `placeName`: `string` — The name of the place you want to show on the button.

- **`<LocationFlatList />`**  
  Displays a list of locations based on a general area and search query or category.  
  **Props:**
  - `location`: `string` — General location, such as "San Francisco."
  - `search`: `string` (optional) — Specific place you are searching for within the location.
  - `category`: `string` (optional) — Category for location recommendations.

### Functions

The functions you may need from `mapEndpoints.ts` include:

- **`getCoordinates(placeName: string): { latitude: number, longitude: number }`**  
  Retrieves the coordinates for a specified place.  
  **Parameters:**

  - `placeName`: `string` — Name of the place to get coordinates for.  
    **Returns:**
  - An object in the format `{ latitude: number, longitude: number }`.

- **`getRecommendations(location: string, category: string): Recommendation[]`**  
  Fetches a list of 10 recommendations for a specified location and category (no pagination).  
  **Parameters:**

  - `location`: `string` — General area (e.g., "San Francisco").
  - `category`: `string` — Category for recommendations.  
    **Returns:**
  - An array of recommendation objects with the following structure:

    ```typescript
    {
      name: string,
      formatted_address: string,
      place_id: string,
      rating?: number,
      user_ratings_total?: number,
      opening_hours?: { open_now: boolean },
      price_level?: number,
      types?: string[],
      geometry?: {
        location: {
          lat: number,
          lng: number
        }
      }
    }
    ```

- **`searchLocations(search: string, location: string): SearchResult[]`**  
  Searches for locations closest to a query within a specified area and returns a list of 5 results (no pagination).  
  **Parameters:**
  - `search`: `string` — Search query (e.g., "Golden Gate Bridge").
  - `location`: `string` — General location (e.g., "San Francisco").  
    **Returns:**
  - An array of search result objects in the same format as `getRecommendations`.
