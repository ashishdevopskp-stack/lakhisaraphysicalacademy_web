import Link from "next/link";
import { Plus } from "lucide-react";
import { getResources } from "@/app/lib/action/resources";
import DeleteResourceButton from "./DeleteResourceButton";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[26px] font-bold">Resources</h1>
        <Link
          href="/admin/resources/new"
          className="flex items-center gap-2 rounded-lg bg-signal px-4 py-2 text-[14px] font-semibold text-white"
        >
          <Plus size={16} /> New Resource
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-black/5 text-text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Publish Date</th>
              <th className="px-4 py-3 font-medium">Downloads</th>
              <th className="px-4 py-3 font-medium">File</th>
              <th className="px-4 py-3 font-medium">Video</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-text">{r.title}</td>
                <td className="px-4 py-3 text-text-muted">{r.category}</td>
                <td className="px-4 py-3 text-text-muted">
                  {new Date(r.publish_date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3 text-text-muted">{r.downloads}</td>
                <td className="px-4 py-3 text-text-muted">
                  {r.file_url ? (
                    <a href={r.file_url} target="_blank" className="text-signal underline">
                      View
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-text-muted">{r.has_video ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/resources/${r.id}/edit`} className="text-signal underline">
                      Edit
                    </Link>
                    <DeleteResourceButton id={r.id} />
                  </div>
                </td>
              </tr>
            ))}

            {resources.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-text-muted">
                  No resources yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}