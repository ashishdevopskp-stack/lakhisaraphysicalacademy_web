import type { LucideIcon } from "lucide-react";
import {
  Dumbbell,
  Shield,
  ShieldCheck,
  Star,
  Target,
  UserCheck,
  Trophy,
  Flame,
  GraduationCap,
  Megaphone,
  Medal,
  PartyPopper,
  Users,
} from "lucide-react";
import type { DbEvent, DbGalleryImage } from "@/app/lib/action/events";

/* =========================================================
   EVENTS CONFIG — static config only. Real event and gallery
   data now comes live from Supabase via getEvents() /
   getGalleryImages() in app/lib/action/events.ts.

   This file no longer holds any dummy event data — only the
   category taxonomy, icons, and small helpers/constants that
   the /events page and admin forms both depend on.
   ========================================================= */

export type Category =
  | "Physical Training Camp"
  | "Army Preparation Camp"
  | "Bihar Police Camp"
  | "Daroga Workshop"
  | "SSC GD Practice Camp"
  | "Guest Physical Test"
  | "Selection Felicitation"
  | "Fitness Challenge"
  | "Career Guidance Seminar"
  | "Recruitment Awareness Program"
  | "Sports Competition"
  | "Academy Celebrations";

// Shape the /events page renders. Produced from DbEvent via
// mapDbEventToEventItem() below — never hand-authored anymore.
export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  date: Date;
  dateLabel: string;
  time: string;
  venue: string;
  status: "Open" | "Closed";
  description: string;
  highlights: string[];
  eligibility?: string;
  seats?: string;
  lastRegistration?: string;
  youtube?: string;
};

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  "Physical Training Camp": Dumbbell,
  "Army Preparation Camp": Shield,
  "Bihar Police Camp": ShieldCheck,
  "Daroga Workshop": Star,
  "SSC GD Practice Camp": Target,
  "Guest Physical Test": UserCheck,
  "Selection Felicitation": Trophy,
  "Fitness Challenge": Flame,
  "Career Guidance Seminar": GraduationCap,
  "Recruitment Awareness Program": Megaphone,
  "Sports Competition": Medal,
  "Academy Celebrations": PartyPopper,
};

export const CATEGORIES: Category[] = [
  "Physical Training Camp",
  "Army Preparation Camp",
  "Bihar Police Camp",
  "Daroga Workshop",
  "SSC GD Practice Camp",
  "Guest Physical Test",
  "Selection Felicitation",
  "Fitness Challenge",
  "Career Guidance Seminar",
  "Recruitment Awareness Program",
  "Sports Competition",
  "Academy Celebrations",
];

const DATE_LABEL_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/**
 * Converts a raw row from the `events` table into the shape the
 * /events page components expect. Call this on every row returned
 * by getEvents()/getEvent() before rendering.
 */
export function mapDbEventToEventItem(row: DbEvent): EventItem {
  const date = new Date(row.event_date);
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? "",
    // Falls back to the first category if the stored value ever
    // drifts from the known list (e.g. renamed enum) instead of
    // throwing at render time.
    category: (CATEGORIES.includes(row.category as Category)
      ? row.category
      : CATEGORIES[0]) as Category,
    date,
    dateLabel: DATE_LABEL_FORMATTER.format(date),
    time: row.time_label ?? "",
    venue: row.venue,
    status: row.status,
    description: row.description ?? "",
    highlights: row.highlights ?? [],
    eligibility: row.eligibility ?? undefined,
    seats: row.seats ?? undefined,
    lastRegistration: row.last_registration ?? undefined,
    youtube: row.youtube_url ?? undefined,
  };
}

// Gallery tile shape the /events page renders. Built from
// getGalleryImages() rows — see mapDbGalleryImage() below.
export type GalleryTile = {
  id: string;
  label: string;
  imageUrl: string;
};

export function mapDbGalleryImage(row: DbGalleryImage): GalleryTile {
  return {
    id: row.id,
    label: row.label,
    imageUrl: row.image_url,
  };
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WHATSAPP_NUMBER = "919999999999";