import type { Metadata } from "next";
import { getResults } from "../lib/action/results";
import { mapDbResultToStudentItem } from "../lib/results-data";
import ResultsClient from "./ResultsClient";

// Rendered fresh on every request so newly added/edited students
// from the admin panel show up immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Selected Students | Lakhisarai Physical Academy",
  description:
    "Celebrating the success stories of our proud achievers in Defence, Police, Paramilitary, Railway, and Government exams.",
};

export default async function ResultsPage() {
  const dbResults = await getResults();
  const students = dbResults.map(mapDbResultToStudentItem);

  return <ResultsClient students={students} />;
}