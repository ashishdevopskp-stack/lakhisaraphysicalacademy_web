import type { Metadata } from "next";
import { getEvents } from "@/app/lib/action/events";
import { mapDbEventToEventItem } from "@/app/lib/events-data";
import EventCategoriesClient from "./EventCategoriesClient";

export const metadata: Metadata = {
  title: "Browse Events by Category | Lakhisarai Physical Academy",
  description:
    "Filter every camp, workshop, and ceremony by type, month, or keyword at Lakhisarai Physical Academy.",
};

export default async function EventCategoriesPage() {
  const rows = await getEvents();
  const events = rows.map(mapDbEventToEventItem);

  return <EventCategoriesClient events={events} />;
}