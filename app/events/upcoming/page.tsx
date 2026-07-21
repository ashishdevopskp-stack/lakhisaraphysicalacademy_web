import { getEvents } from "@/app/lib/action/events";
import { mapDbEventToEventItem } from "@/app/lib/events-data";
import UpcomingEventsClient from "./UpcomingEventsClient";

export default async function UpcomingEventsPage() {
  const rows = await getEvents();
  const events = rows.map(mapDbEventToEventItem);

  return <UpcomingEventsClient events={events} />;
}