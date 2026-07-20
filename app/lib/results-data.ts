import type { LucideIcon } from "lucide-react";
import {
  Shield,
  ShieldAlert,
  Star,
  ShieldCheck,
  TrainFront,
  Flame,
  Home as HomeIcon,
  Landmark,
} from "lucide-react";
import type { DbResult } from "@/app/lib/action/results";

/* =========================================================
   RESULTS CONFIG — static taxonomy only. Real selected-student
   data comes live from Supabase via getResults() in
   app/lib/action/results.ts.
   ========================================================= */

export type Department =
  | "Army"
  | "Bihar Police"
  | "Bihar Daroga"
  | "SSC GD"
  | "CISF"
  | "CRPF"
  | "BSF"
  | "ITBP"
  | "Railway"
  | "Fireman"
  | "Home Guard"
  | "Other Government Jobs";

export const DEPARTMENTS: Department[] = [
  "Army",
  "Bihar Police",
  "Bihar Daroga",
  "SSC GD",
  "CISF",
  "CRPF",
  "BSF",
  "ITBP",
  "Railway",
  "Fireman",
  "Home Guard",
  "Other Government Jobs",
];

export const DEPARTMENT_ICONS: Record<Department, LucideIcon> = {
  Army: Shield,
  "Bihar Police": ShieldAlert,
  "Bihar Daroga": Star,
  "SSC GD": ShieldCheck,
  CISF: Shield,
  CRPF: ShieldCheck,
  BSF: ShieldAlert,
  ITBP: ShieldCheck,
  Railway: TrainFront,
  Fireman: Flame,
  "Home Guard": HomeIcon,
  "Other Government Jobs": Landmark,
};

export type SelectionStatus = "Selected" | "Under Training" | "Document Verification";

export const STATUS_OPTIONS: SelectionStatus[] = [
  "Selected",
  "Under Training",
  "Document Verification",
];

// Shape the /results page renders. Produced from DbResult via
// mapDbResultToStudentItem() below.
export type StudentItem = {
  id: string;
  name: string;
  post: string;
  exam: string;
  department: Department;
  district: string;
  year: string;
  rank?: string;
  status: SelectionStatus;
  photoUrl?: string;
  testimonial?: string;
  videoUrl?: string;
};

export function mapDbResultToStudentItem(row: DbResult): StudentItem {
  return {
    id: row.id,
    name: row.name,
    post: row.post,
    exam: row.exam,
    department: (DEPARTMENTS.includes(row.department as Department)
      ? row.department
      : DEPARTMENTS[0]) as Department,
    district: row.district,
    year: row.year,
    rank: row.rank_score ?? undefined,
    status: row.status,
    photoUrl: row.photo_url ?? undefined,
    testimonial: row.testimonial ?? undefined,
    videoUrl: row.video_url ?? undefined,
  };
}

// Academy-level figures that aren't derivable from individual
// selection records (no "students trained" or "founded year"
// column exists per-row). Edit these two directly when they
// change — everything else on the results page (total
// selections, per-department counts) is computed live from
// the real rows returned by getResults().
export const TOTAL_STUDENTS_TRAINED = "1,200+";
export const ACADEMY_SUCCESS_SINCE = "2016";