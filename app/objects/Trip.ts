import { Event } from "./Event";

export interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  image: string;
  Itinerary: Event[];
}
