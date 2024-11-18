# Calendar Share

### Functions

The only function you will need is shareEventAsICS(Event[]): void.
Which formats the events into an ics file and then use expo-sharing to share the file.
Here is the documentation of [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/).

#### How to use

To use this, you should make a button somewhere for a "Trip" where you can use something like

```javascript
    import { shareEventAsICS } from '....'

    const events: Event[] = trip.getAllTripEvents();
    <Pressable onPress={shareEventsAsICS(events)}/>
```
