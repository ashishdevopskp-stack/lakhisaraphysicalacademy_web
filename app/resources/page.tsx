import { getResources } from "@/app/lib/action/resources";
import { mapDbResourceToResourceItem } from "../lib/resourses-data";
import ResourcesClient from "./ResourcesClient";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const dbResources = await getResources();
  const resources = dbResources.map(mapDbResourceToResourceItem);

  return <ResourcesClient resources={resources} />;
}