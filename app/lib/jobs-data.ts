import type { LucideIcon } from "lucide-react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Star,
  Mountain,
  Anchor,
  Plane,
  TrainFront,
  TreePine,
  Flame,
  Home as HomeIcon,
  Landmark,
} from "lucide-react";
import type { DbJob } from "./action/jobs";

export interface JobCategory {
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: JobCategory[] = [
  { label: "Army", icon: Shield },
  { label: "Bihar Police Constable", icon: ShieldAlert },
  { label: "Bihar Daroga (SI)", icon: Star },
  { label: "SSC GD", icon: ShieldCheck },
  { label: "CISF", icon: Shield },
  { label: "CRPF", icon: ShieldCheck },
  { label: "BSF", icon: ShieldAlert },
  { label: "ITBP", icon: Mountain },
  { label: "SSB", icon: Shield },
  { label: "Indian Navy", icon: Anchor },
  { label: "Indian Air Force", icon: Plane },
  { label: "Railway", icon: TrainFront },
  { label: "Forest Guard", icon: TreePine },
  { label: "Fireman", icon: Flame },
  { label: "Home Guard", icon: HomeIcon },
  { label: "Other Government Jobs", icon: Landmark },
];

export const JOB_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

export type JobStatus = "New" | "Ongoing" | "Closed";
export const JOB_STATUSES: JobStatus[] = ["New", "Ongoing", "Closed"];

export const STATUS_STYLES: Record<JobStatus, string> = {
  New: "text-signal-strong",
  Ongoing: "text-accent-strong",
  Closed: "text-text-faint",
};

export interface JobItem {
  id: string;
  title: string;
  subtitle: string | null;
  organization: string;
  category: string;
  status: JobStatus;
  notificationDate: string;
  lastDate: string;
  location: string;
  pdfUrl: string | null;
  videoUrl: string | null;
  detailsUrl: string | null;
}

export function mapDbJobToJobItem(db: DbJob): JobItem {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return {
    id: db.id,
    title: db.title,
    subtitle: db.subtitle,
    organization: db.organization,
    category: db.category,
    status: (db.status as JobStatus) ?? "New",
    notificationDate: fmt(db.notification_date),
    lastDate: fmt(db.last_date),
    location: db.location,
    pdfUrl: db.pdf_url,
    videoUrl: db.video_url,
    detailsUrl: db.details_url,
  };
}