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
      `Hello, I saw ${student.name}'s success story and would like to know more about training at the academy.`
    )
  );

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Link
          href="/result#students"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-signal-strong"
        >
          <ArrowLeft size={15} /> Back to Selected Students
        </Link>

        <div className="card-flat mt-8 flex flex-col gap-8 p-8 sm:flex-row">
          <div className="glass flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {student.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={student.photoUrl}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[12px] text-text-muted">No photo</span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="font-display text-[26px] font-bold text-text">
              {student.name}
            </h1>
            <p className="font-body mt-1 text-[15px] text-text-muted">
              {student.post}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge>{student.department}</Badge>
              <span className="text-[13px] font-medium text-signal-strong">
                ● {student.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2 text-[14px] text-text-muted sm:grid-cols-2">
              <span className="flex items-center gap-2">
                <ClipboardList size={15} /> {student.exam}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} /> {student.district}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={15} /> {student.year}
              </span>
              {student.rank && (
                <span className="flex items-center gap-2">
                  <Award size={15} /> {student.rank}
                </span>
              )}
            </div>

            {student.testimonial && (
              <blockquote className="font-body mt-6 border-l-2 border-signal-strong pl-4 text-[14px] italic leading-relaxed text-text-muted">
                &ldquo;{student.testimonial}&rdquo;
              </blockquote>
            )}

            {student.videoUrl && (
              <div className="mt-6">
                <Button href={student.videoUrl} variant="ghost" icon={Play}>
                  Watch Success Story
                </Button>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={enquiryHref} variant="whatsapp" icon={MessageCircle}>
                Ask About This Journey
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}