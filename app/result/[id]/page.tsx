import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  ClipboardList,
  Play,
  MessageCircle,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { getResult } from "../../lib/action/results";
import { mapDbResultToStudentItem } from "../../lib/results-data";
import { whatsappHref } from "@/app/lib/constants";

// Rendered fresh on every request so an edited/deleted student
// reflects immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dbResult = await getResult(id);
  if (!dbResult) {
    return { title: "Student Not Found | Lakhisarai Physical Academy" };
  }
  const student = mapDbResultToStudentItem(dbResult);
  return {
    title: `${student.name} — ${student.post} | Lakhisarai Physical Academy`,
    description:
      `${student.name} was selected as ${student.post} (${student.exam}) — a success story from Lakhisarai Physical Academy.`.slice(
        0,
        160
      ),
  };
}

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dbResult = await getResult(id);
  if (!dbResult) notFound();

  const student = mapDbResultToStudentItem(dbResult);

  const enquiryHref = whatsappHref(
    encodeURIComponent(
      `Hello, I saw ${student.name}'s selection story and would like to inquire about training at Lakhisarai Physical Academy.`
    )
  );

  // Parse YouTube video embed if available
  let videoEmbedUrl: string | null = null;
  if (student.videoUrl) {
    const match = student.videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    if (match && match[2].length === 11) {
      videoEmbedUrl = `https://www.youtube-nocookie.com/embed/${match[2]}`;
    }
  }

  return (
    <section className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Back Link */}
        <Link
          href="/result#students"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-700 hover:text-[#ea580c] bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Selected Achievers
        </Link>

        {/* Main Student Card Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Card Header & Details */}
          <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
            {/* Top Accent Gradient */}
            <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 absolute top-0 inset-x-0" />

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              {/* Student Avatar */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-amber-400/40 shrink-0 bg-slate-100 flex items-center justify-center">
                {student.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={student.photoUrl}
                    alt={student.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-black text-slate-400">No Photo</span>
                )}
              </div>

              {/* Information Header */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-[#138808] border border-emerald-300">
                    ● {student.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                    {student.department}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
                    Batch {student.year}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {student.name}
                </h1>
                <p className="text-base sm:text-lg font-black text-[#ea580c]">
                  Selected as {student.post}
                </p>

                {/* Details Chips Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">Recruitment Exam</span>
                    <span className="font-extrabold text-slate-900 flex items-center gap-1">
                      <ClipboardList size={14} className="text-orange-500 shrink-0" />
                      <span className="truncate">{student.exam}</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">District</span>
                    <span className="font-extrabold text-slate-900 flex items-center gap-1">
                      <MapPin size={14} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{student.district}</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">Selection Year</span>
                    <span className="font-extrabold text-slate-900 flex items-center gap-1">
                      <Calendar size={14} className="text-blue-500 shrink-0" />
                      <span>{student.year}</span>
                    </span>
                  </div>

                  {student.rank && (
                    <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                      <span className="text-[10px] font-extrabold uppercase text-amber-700 block mb-0.5">Rank / Score</span>
                      <span className="font-black text-amber-900 flex items-center gap-1">
                        <Award size={14} className="text-amber-600 shrink-0" />
                        <span>{student.rank}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-4">
                  <Button href={enquiryHref} variant="whatsapp" icon={MessageCircle}>
                    Ask About {student.name}&apos;s Physical Training Journey
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote Card (if available) */}
          {student.testimonial && (
            <div className="rounded-3xl bg-white border-2 border-amber-300 p-6 sm:p-8 shadow-lg relative overflow-hidden space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                  💬 What Our Achiever Says
                </span>
              </div>
              <blockquote className="text-base sm:text-lg font-bold text-slate-800 italic leading-relaxed pt-2">
                &ldquo;{student.testimonial}&rdquo;
              </blockquote>
              <p className="text-xs font-black text-[#ea580c] pt-2 border-t border-slate-100">
                — {student.name} ({student.post}, {student.department})
              </p>
            </div>
          )}

          {/* Success Story Video Card (if available) */}
          {student.videoUrl && (
            <div className="rounded-3xl bg-slate-950 text-white border-2 border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded-full inline-flex items-center gap-1.5">
                  <Play size={14} className="text-red-400 animate-pulse" />
                  <span>Success Story Video</span>
                </span>

                <a
                  href={student.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-colors inline-flex items-center gap-1"
                >
                  <Play size={12} /> Open in YouTube
                </a>
              </div>

              <h2 className="text-lg font-black text-white">
                Watch {student.name}&apos;s Live Physical Test Interview &amp; Experience
              </h2>

              <div className="relative aspect-video rounded-2xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
                {videoEmbedUrl ? (
                  <iframe
                    src={videoEmbedUrl}
                    title={`${student.name} Success Story`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <Play size={48} className="text-red-500 mb-2" />
                    <a
                      href={student.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-black text-white hover:underline"
                    >
                      Click here to watch {student.name}&apos;s video on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}