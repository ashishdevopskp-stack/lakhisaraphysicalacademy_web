import type { Metadata } from "next";
import { getEvents, getGalleryImages } from "../lib/action/events";
import { mapDbEventToEventItem, mapDbGalleryImage } from "../lib/events-data";
import EventsClient from "./EventsClient";

// Rendered fresh on every request so newly created/edited events
// and gallery images from the admin panel show up immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events & Activities | Lakhisarai Physical Academy",
  description:
    "Explore training camps, competitions, workshops, and special academy events at Lakhisarai Physical Academy.",
};

export default async function EventsPage() {
  const [dbEvents, dbGallery] = await Promise.all([getEvents(), getGalleryImages()]);

  const events = dbEvents.map(mapDbEventToEventItem);
  const gallery = dbGallery.map(mapDbGalleryImage);

  return <EventsClient events={events} gallery={gallery} />;
}