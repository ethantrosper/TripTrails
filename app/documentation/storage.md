# Storage Documentation

## Initialization

The Realm database should be created when the app starts. There’s no need to call `initializeRealm()` again.

## Functions

### Database Management

#### `getRealm()`

Returns the current instance of the Realm database.

#### `closeRealm()`

Closes the Realm instance to free up resources.

### User Functions

#### `insertUser(realm: Realm, username: string, password: string): void`

Inserts a new user into the database.

- **Parameters:**
  - `realm`: The Realm instance.
  - `username` _(string, required)_: Username for the new user.
  - `password` _(string, required)_: Password for the new user.

#### `getCurrentUser(): User`

Gets the current user that is signed in from the database and returns it as an object `User`. This function is specifcally from useAuth from authHooks.ts

### Trip Functions

#### `insertTrip(realm: Realm, user: User, title: string, location: string, startDate: Date, endDate: Date, description?: string, tripColor?: string): void`

Inserts a new trip for a user.

- **Parameters:**
  - `realm`: The Realm instance.
  - `user`: The user to whom the trip belongs.
  - `title` _(string, required)_: The trip title.
  - `location` _(string, required)_: The location of the trip.
  - `startDate` _(Date, required)_: Start date of the trip.
  - `endDate` _(Date, required)_: End date of the trip.
  - `description` _(string, optional)_: Additional details about the trip.
  - `tripColor` _(string, optional)_: Color associated with the trip.

#### `updateTrip(realm: Realm, trip: Trip, updates: Partial<{ title: string; description: string; location: string; tripColor: string; isComplete: boolean; startDate: Date; endDate: Date; }>): void`

Updates an existing trip's details.

- **Parameters:**
  - `realm`: The Realm instance.
  - `trip`: The trip to be updated.
  - `updates`: An object with any of the following optional fields to update:
    - `title`, `description`, `location`, `tripColor`, `isComplete`, `startDate`, `endDate`.
- **Example:**

  ```javascript
  const realm = getRealm();

  // Define the updates you want to make to a trip
  const updates = {
    title: "Updated Trip Title",
    location: "New Location",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-10"),
    isComplete: true,
  };

  try {
    const updatedTrip = await updateTrip(realm, trip, updates);
    console.log("Trip updated successfully:", updatedTrip);
  } catch (error) {
    console.error("Failed to update trip:", error);
  }
  ```

#### `getAllUserTrips(user: User): Trip[]`

Fetches all trips for a specific user.

- **Parameters:**
  - `user`: The user whose trips should be retrieved.

#### `getTrip(trip: Trip): Trip`

Fetches a specific trip.

- **Parameters:**
  - `trip`: The trip to retrieve.

#### `deleteTrip(trip: Trip): void`

Deletes a specific trip from the database.

- **Parameters:**
  - `trip`: The trip to be deleted.

### Event Functions

#### `insertEvent(realm: Realm, trip: Trip, location: string, eventDate: Date, eventTimeStart?: Date, description?: string, note?: string, eventTimeEnd?: Date, category?: string, mapUrl?: string, alertDate?: Date, alert?: boolean): void`

Inserts a new event for a specific trip.

- **Parameters:**
  - `realm`: The Realm instance.
  - `trip`: The trip to which the event belongs.
  - `location` _(string, required)_: Location of the event.
  - `eventDate` _(Date, required)_: Date of the event.
  - `eventTimeStart` _(Date, optional)_: Start time of the event.
  - `description` _(string, optional)_: Details about the event.
  - `note` _(string, optional)_: Additional notes for the event.
  - `eventTimeEnd` _(Date, optional)_: End time of the event.
  - `category` _(string, optional)_: Category of the event.
  - `mapUrl` _(string, optional)_: URL for the event location on a map.
  - `alertDate` _(Date, optional)_: Date for alert notification.
  - `alert` _(boolean, optional)_: Whether an alert should be set for the event.

#### `updateEvent(realm: Realm, event: Event, updates: Partial<{ description: string; note: string; location: string; eventDate: Date; eventTimeStart: Date; eventTimeEnd: Date; isComplete: boolean; category: string; mapUrl: string; alertDate: Date; alert: boolean; }>): void`

Updates an existing event's details.

- **Parameters:**

  - `realm`: The Realm instance.
  - `event`: The event to be updated.
  - `updates`: An object with any of the following optional fields to update:

    - `description`, `note`, `location`, `eventDate`, `eventTimeStart`, `eventTimeEnd`, `isComplete`, `category`, `mapUrl`, `alertDate`, `alert`.

    - **Example:**

  ```javascript
  const realm = getRealm();

  // Define the updates you want to make for an event
  const updates = {
    description: "Updated Event Description",
    location: "Updated Location",
    eventDate: new Date("2024-11-20"),
    eventTimeStart: new Date("2024-11-20T10:00:00"),
    eventTimeEnd: new Date("2024-11-20T12:00:00"),
    alert: true,
  };

  try {
    const updatedEvent = await updateEvent(realm, event, updates);
    console.log("Event updated successfully:", updatedEvent);
  } catch (error) {
    console.error("Failed to update event:", error);
  }
  ```

#### `getAllTripEvents(trip: Trip): Event[]`

Fetches all events for a specific trip.

- **Parameters:**
  - `trip`: The trip whose events should be retrieved.

#### `getEvent(event: Event): Event`

Fetches a specific event.

- **Parameters:**
  - `event`: The event to retrieve.

#### `deleteEvent(event: Event): void`

Deletes a specific event from the database.

- **Parameters:**
  - `event`: The event to be deleted.
