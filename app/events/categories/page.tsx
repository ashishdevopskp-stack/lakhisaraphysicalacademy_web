import { getEvents } from "@/app/lib/action/events";
import { mapDbEventToEventItem } from "@/app/lib/events-data";
import EventCategoriesClient from "./EventCategoriesClient";

export default async function EventCategoriesPage() {
  const rows = await getEvents();
  const events = rows.map(mapDbEventToEventItem);

  return <EventCategoriesClient events={events} />;
}