import type { Metadata } from "next";
import { getEvents } from "@/app/lib/action/events";
import { mapDbEventToEventItem } from "@/app/lib/events-data";
import UpcomingEventsClient from "./UpcomingEventsClient";

export const metadata: Metadata = {
  title: "Upcoming Events | Lakhisarai Physical Academy",
  description:
    "Open training camps, workshops, and guest tests with registration currently open at Lakhisarai Physical Academy.",
};

export default async function UpcomingEventsPage() {
  const rows = await getEvents();
  const events = rows.map(mapDbEventToEventItem);

  return <UpcomingEventsClient events={events} />;
}