import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { getCurrentUserRole } from "@/app/lib/action/auth";
import { getBlogs } from "@/app/lib/action/blogs";
import { AdminSidebar } from "../_components/AdminSidebar";
import { BlogManagementView } from "./_components/BlogManagementView";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect("/admin/login");

  const role = await getCurrentUserRole();
  if (role !== "admin") redirect("/");

  let blogs: Awaited<ReturnType<typeof getBlogs>> = [];
  try {
    blogs = await getBlogs();
  } catch {
    // fallback
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Blogs" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl w-full mx-auto space-y-6">
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800">
            {error}
          </div>
        )}

        <BlogManagementView initialBlogs={blogs} />
      </main>
    </div>
  );
}