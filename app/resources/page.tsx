import type { Metadata } from "next";
import { getResources } from "@/app/lib/action/resources";
import { mapDbResourceToResourceItem } from "../lib/resourses-data";
import ResourcesClient from "./ResourcesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free Resources | Lakhisarai Physical Academy",
  description:
    "Download free study materials & physical training resources — notes, PDFs, workout plans, physical standards, and diet guides.",
};

export default async function ResourcesPage() {
  const dbResources = await getResources();
  const resources = dbResources.map(mapDbResourceToResourceItem);

  return <ResourcesClient resources={resources} />;
}