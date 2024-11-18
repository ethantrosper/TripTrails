import { createEvents, DateArray } from "ics";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Event } from "../models/Event";

const dateToDateArray = (date: Date): DateArray => [
  date.getFullYear(),
  date.getMonth() + 1, // ics package expects months to be 1-indexed
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
];

export const shareEventsAsICS = async (events: Event[]): Promise<void> => {
  try {
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (!isSharingAvailable) {
      throw new Error("Sharing is not available");
    }

    // Get events of a trip and convert to ics format
    const icsEvents = events.map((event) => {
      const icsEvent: any = {
        start: dateToDateArray(event.eventTimeStart || event.eventDate),
        location: event.location,
        productId: "triptrails",
        uid: event._id.toHexString(),
        created: dateToDateArray(event.createdAt),
        title: event.title,
      };

      // Description of the event (the one the user writes)
      if (event.note) {
        icsEvent.description = event.note;
      }

      // Time of the event
      if (event.eventTimeEnd) {
        icsEvent.end = dateToDateArray(event.eventTimeEnd);
      } else if (event.eventTimeStart) {
        // Default to 1 hour duration if no end time
        const endTime = new Date(event.eventTimeStart);
        endTime.setHours(endTime.getHours() + 1);
        icsEvent.end = dateToDateArray(endTime);
      } else {
        // For all day events
        icsEvent.allDay = true;
        const endDate = new Date(event.eventDate);
        endDate.setDate(endDate.getDate() + 1);
        icsEvent.end = dateToDateArray(endDate);
      }

      if (event.category) {
        icsEvent.categories = [event.category];
      }

      // Alarms
      if (event.alert && event.alertDate) {
        const alertOffset = Math.floor(
          (event.eventDate.getTime() - event.alertDate.getTime()) / (60 * 1000),
        );
        icsEvent.alarms = [
          {
            action: "display",
            description: "Reminder",
            trigger: { minutes: alertOffset, before: true },
          },
        ];
      }

      return icsEvent;
    });

    // Generate ICS content
    const { error, value } = createEvents(icsEvents);

    if (error) {
      throw new Error(`Failed to create ICS file: ${error}`);
    }

    if (!value) {
      throw new Error("Failed to generate ICS content");
    }

    // Write the ICS content to a file
    const filename = "events.ics";
    const filePath = `${FileSystem.cacheDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(filePath, value);

    // Share the file
    await Sharing.shareAsync(filePath, {
      UTI: "public.calendar", //ios
      mimeType: "text/calendar", //android
      dialogTitle: "Share Calendar Events",
    });

    await FileSystem.deleteAsync(filePath, { idempotent: true });
  } catch (error) {
    console.error("Error sharing calendar events:", error);
    throw error;
  }
};
