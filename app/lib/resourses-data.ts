import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FileText,
  Flame,
  Dumbbell,
  Salad,
  Ruler,
  ClipboardList,
  Megaphone,
  Video,
  FolderOpen,
} from "lucide-react";

/* =========================================================
   RESOURCES DATA — single source of truth for the /resources
   page. Currently dummy data so the UI has something real to
   show.

   When the real downloads library is ready, this is the only
   file that needs to change: replace the arrays below with
   data from the admin panel's API/database (matching the same
   types). The page component itself never needs to change.
   ========================================================= */

export interface ResourceCategory {
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: ResourceCategory[] = [
  { label: "Study Notes", icon: BookOpen },
  { label: "PDF Notes", icon: FileText },
  { label: "Running Charts", icon: Flame },
  { label: "Workout Plans", icon: Dumbbell },
  { label: "Diet Plans", icon: Salad },
  { label: "Physical Standards", icon: Ruler },
  { label: "Practice Sheets", icon: ClipboardList },
  { label: "Recruitment Notifications", icon: Megaphone },
  { label: "Video Guides", icon: Video },
  { label: "Other Resources", icon: FolderOpen },
];

export interface Resource {
  title: string;
  description: string;
  category: string;
  publishDate: string;
  downloads: number;
  hasVideo?: boolean;
}

// DUMMY DATA — replace with the real resource library (or a
// fetch from the admin panel) once that's ready. Shape must
// match Resource[]. `category` must match a label in
// CATEGORIES exactly, or it won't show up under that filter.
export const RESOURCES: Resource[] = [
  {
    title: "Army Physical Standards Chart 2026",
    description: "Height, chest, and running standards for every category.",
    category: "Physical Standards",
    publishDate: "05 Jul 2026",
    downloads: 3420,
  },
  {
    title: "1600m Running Improvement Plan",
    description: "A 6-week chart to bring down your running time.",
    category: "Running Charts",
    publishDate: "01 Jul 2026",
    downloads: 2890,
    hasVideo: true,
  },
  {
    title: "4-Week Bodyweight Workout Plan",
    description: "No-equipment strength routine for recruits.",
    category: "Workout Plans",
    publishDate: "26 Jun 2026",
    downloads: 2140,
  },
  {
    title: "Diet Plan for Physical Test Aspirants",
    description: "What to eat before and after training sessions.",
    category: "Diet Plans",
    publishDate: "18 Jun 2026",
    downloads: 1760,
  },
  {
    title: "SSC GD Practice Question Set",
    description: "100 practice questions with answer key.",
    category: "Practice Sheets",
    publishDate: "10 Jun 2026",
    downloads: 3110,
  },
  {
    title: "Bihar Police Constable Study Notes",
    description: "Concise notes covering the full written exam syllabus.",
    category: "Study Notes",
    publishDate: "02 Jun 2026",
    downloads: 2480,
  },
  {
    title: "Latest Recruitment Notification PDF",
    description: "Official notification with eligibility and dates.",
    category: "Recruitment Notifications",
    publishDate: "28 May 2026",
    downloads: 4230,
  },
  {
    title: "Current Affairs Booklet — June 2026",
    description: "Monthly current affairs for written exams.",
    category: "PDF Notes",
    publishDate: "20 May 2026",
    downloads: 1980,
  },
];