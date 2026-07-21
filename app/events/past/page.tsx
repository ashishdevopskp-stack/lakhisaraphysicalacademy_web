import { getEvents } from "@/app/lib/action/events";
import { mapDbEventToEventItem } from "@/app/lib/events-data";
import PastEventsClient from "./PastEventsClient";

export default async function PastEventsPage() {
  const rows = await getEvents();
  const events = rows.map(mapDbEventToEventItem);

  return <PastEventsClient events={events} />;
}