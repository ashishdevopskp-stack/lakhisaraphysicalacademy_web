import ResourceForm from "../ResourceForm";
import { createResource } from "@/app/lib/action/resources";

export default function NewResourcePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display text-[26px] font-bold">New Resource</h1>
      <ResourceForm action={createResource} submitLabel="Create Resource" error={searchParams.error} />
    </div>
  );
}