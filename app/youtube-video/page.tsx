import type { Metadata } from "next";
import { getPublishedVideos } from "@/app/lib/action/videos";
import VideosContent from "./VideosContent";

export const metadata: Metadata = {
  title: "YouTube Videos | Lakhisarai Physical Academy",
  description:
    "Watch training sessions, recruitment updates & preparation guides from Lakhisarai Physical Academy.",
};

export default async function VideosPage() {
  const videos = await getPublishedVideos();

  return <VideosContent videos={videos} />;
}