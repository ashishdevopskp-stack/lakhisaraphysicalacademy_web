import type { Metadata } from "next";
import { getEvents } from "@/app/lib/action/events";
import { mapDbEventToEventItem } from "@/app/lib/events-data";
import PastEventsClient from "./PastEventsClient";

export const metadata: Metadata = {
  title: "Past Events | Lakhisarai Physical Academy",
  description:
    "A record of completed camps, challenges, and celebrations at Lakhisarai Physical Academy.",
};

export default async function PastEventsPage() {
  const rows = await getEvents();
  const events = rows.map(mapDbEventToEventItem);

  return <PastEventsClient events={events} />;
}