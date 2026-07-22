import type { Metadata } from "next";
import { getJobs } from "@/app/lib/action/jobs";
import { mapDbJobToJobItem } from "../lib/jobs-data";
import JobsClient from "./JobsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Latest Government Job Vacancies | Lakhisarai Physical Academy",
  description:
    "Stay updated with the latest Defence, Police, Railway & Government recruitment notifications, eligibility, and important dates.",
};

export default async function JobsPage() {
  const dbJobs = await getJobs();
  const jobs = dbJobs.map(mapDbJobToJobItem);

  return <JobsClient jobs={jobs} />;
}