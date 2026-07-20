import { notFound } from "next/navigation";
import ResourceForm from "../../ResourceForm";
import { getResource, updateResource } from "@/app/lib/action/resources";

export default async function EditResourcePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const resource = await getResource(params.id);
  if (!resource) notFound();

  const updateWithId = updateResource.bind(null, params.id);

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display text-[26px] font-bold">Edit Resource</h1>
      <ResourceForm
        action={updateWithId}
        resource={resource}
        submitLabel="Save Changes"
        error={searchParams.error}
      />
    </div>
  );
}