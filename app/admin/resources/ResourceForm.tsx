"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { CATEGORIES } from "@/app/lib/resourses-data";
import type { DbResource } from "@/app/lib/action/resources";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-signal px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-50"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

export default function ResourceForm({
  action,
  resource,
  submitLabel = "Create Resource",
  error,
}: {
  action: (formData: FormData) => void;
  resource?: DbResource;
  submitLabel?: string;
  error?: string;
}) {
  const [hasVideo, setHasVideo] = useState(!!resource?.video_url);

  return (
    <form action={action} className="mt-8 flex max-w-2xl flex-col gap-5">
      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-500">
          {error}
        </p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-muted">Title</span>
        <input
          name="title"
          required
          defaultValue={resource?.title}
          className="glass rounded-lg px-4 py-2.5 text-[14px] outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-muted">Description</span>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={resource?.description}
          className="glass rounded-lg px-4 py-2.5 text-[14px] outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-muted">Category</span>
        <select
          name="category"
          required
          defaultValue={resource?.category ?? CATEGORIES[0].label}
          className="glass rounded-lg px-4 py-2.5 text-[14px] outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c.label} value={c.label}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-muted">Publish Date</span>
        <input
          type="date"
          name="publishDate"
          defaultValue={resource?.publish_date?.slice(0, 10)}
          className="glass rounded-lg px-4 py-2.5 text-[14px] outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-muted">
          File {resource?.file_url ? "(leave empty to keep the current file)" : ""}
        </span>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="glass rounded-lg px-4 py-2.5 text-[14px] outline-none"
        />
        {resource?.file_url && (
          <a href={resource.file_url} target="_blank" className="text-[12px] text-signal underline">
            View current file
          </a>
        )}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-text-muted">Video URL (optional)</span>
        <input
          name="videoUrl"
          defaultValue={resource?.video_url ?? ""}
          onChange={(e) => setHasVideo(e.target.value.trim().length > 0)}
          placeholder="https://youtube.com/…"
          className="glass rounded-lg px-4 py-2.5 text-[14px] outline-none"
        />
        {hasVideo && (
          <span className="text-[12px] text-text-faint">
            A "Watch Video" button will show on this resource.
          </span>
        )}
      </label>

      <div>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}