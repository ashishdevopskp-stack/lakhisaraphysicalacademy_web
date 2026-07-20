import { getResults } from "../lib/action/results";
import { mapDbResultToStudentItem } from "../lib/results-data";
import ResultsClient from "./ResultsClient";

// Rendered fresh on every request so newly added/edited students
// from the admin panel show up immediately.
export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const dbResults = await getResults();
  const students = dbResults.map(mapDbResultToStudentItem);

  return <ResultsClient students={students} />;
}