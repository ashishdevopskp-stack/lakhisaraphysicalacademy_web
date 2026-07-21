import { getJobs } from "@/app/lib/action/jobs";
import { mapDbJobToJobItem } from "../lib/jobs-data";
import JobsClient from "./JobsClient";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const dbJobs = await getJobs();
  const jobs = dbJobs.map(mapDbJobToJobItem);

  return <JobsClient jobs={jobs} />;
}