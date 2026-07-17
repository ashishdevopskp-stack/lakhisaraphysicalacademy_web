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

/* =========================================================
   EVENTS DATA — this file is the single source of truth for
   the /events page. Right now it's filled with dummy data so
   the UI has something real to render.

   Later, when the admin panel is wired up, this is the only
   file that needs to change: replace the arrays below with
   data fetched from the admin panel's API/database (e.g. swap
   the `export const EVENTS = [...]` for a fetch call, or keep
   this as the fallback/seed data). The page component itself
   never needs to change — it just imports from here.
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

// DUMMY DATA — replace with real events (or a fetch from the
// admin panel) once that's ready. Shape must match EventItem[].
export const EVENTS: EventItem[] = [
  {
    id: "guest-physical-test-jul-2026",
    title: "Guest Physical Test",
    subtitle: "Open trial run under real recruitment test conditions",
    category: "Guest Physical Test",
    date: new Date("2026-07-25T06:00:00"),
    dateLabel: "25 July 2026",
    time: "06:00 AM – 09:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "A guest trial for outside students to attempt the run, long jump, and endurance drills exactly as measured on official recruitment day, with instant feedback from our trainers.",
    highlights: [
      "Timed 1.6 km / 5 km run on marked track",
      "Standing long jump & chin-up assessment",
      "One-to-one feedback from Ganesh Sir",
    ],
    eligibility: "Open to all aspirants aged 17–25, no prior enrolment required.",
    seats: "40 seats",
    lastRegistration: "23 July 2026",
  },
  {
    id: "army-prep-camp-aug-2026",
    title: "Army Preparation Camp",
    subtitle: "10-day intensive drill for the upcoming Army rally",
    category: "Army Preparation Camp",
    date: new Date("2026-08-05T05:00:00"),
    dateLabel: "5 – 14 August 2026",
    time: "05:00 AM – 08:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "Focused conditioning for the Army rally bharti standards — running, beam, ditch, and zig-zag balance — with daily timing records so students can track improvement.",
    highlights: [
      "Daily 1.6 km timed runs with logged records",
      "Beam, ditch & zig-zag balance practice",
      "Diet and recovery guidance included",
    ],
    eligibility: "Enrolled academy students; guest slots on request.",
    seats: "60 seats",
    lastRegistration: "3 August 2026",
  },
  {
    id: "bihar-police-camp-aug-2026",
    title: "Bihar Police Camp",
    subtitle: "Full-format PET/PST practice for Bihar Police recruitment",
    category: "Bihar Police Camp",
    date: new Date("2026-08-20T04:00:00"),
    dateLabel: "20 August 2026",
    time: "04:00 PM – 07:00 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "A dedicated evening camp mirroring the Bihar Police physical efficiency and standard tests, with height, chest, and run measurements taken exactly as on selection day.",
    highlights: [
      "Mock PST — height, chest & weight check",
      "PET run under official time limits",
      "Q&A on documentation and cut-offs",
    ],
    seats: "50 seats",
    lastRegistration: "18 August 2026",
  },
  {
    id: "ssc-gd-camp-sep-2026",
    title: "SSC GD Practice Camp",
    subtitle: "Race-pace training for the SSC GD physical round",
    category: "SSC GD Practice Camp",
    date: new Date("2026-09-10T05:00:00"),
    dateLabel: "10 September 2026",
    time: "05:00 AM – 08:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "Structured interval training to help students hit SSC GD's 24-minute (male) and 8.5-minute (female) benchmarks, with weekly pace tracking.",
    highlights: [
      "Interval and pace-building sessions",
      "Category-wise timing targets",
      "Mock test in the final week",
    ],
    seats: "45 seats",
    lastRegistration: "8 September 2026",
  },
  {
    id: "daroga-workshop-oct-2026",
    title: "Daroga Workshop",
    subtitle: "Seminar on the Bihar Daroga (SI) physical & written pattern",
    category: "Daroga Workshop",
    date: new Date("2026-10-05T16:00:00"),
    dateLabel: "5 October 2026",
    time: "04:00 PM – 06:30 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Open",
    description:
      "A workshop covering the complete Daroga (Sub-Inspector) selection process — physical standards, exam pattern, and a realistic preparation timeline.",
    highlights: [
      "Physical standards & measurement rules explained",
      "Exam pattern and cut-off trends",
      "Open floor Q&A with past selects",
    ],
    seats: "80 seats",
    lastRegistration: "3 October 2026",
  },
  {
    id: "fitness-challenge-jun-2026",
    title: "Fitness Challenge",
    subtitle: "Academy-wide endurance and strength challenge",
    category: "Fitness Challenge",
    date: new Date("2026-06-15T05:00:00"),
    dateLabel: "15 June 2026",
    time: "05:00 AM – 08:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "Students competed across running, push-ups, and pull-up stations to mark mid-year progress, with results posted on the academy notice board.",
    highlights: [
      "1.6 km timed run",
      "Max push-ups & pull-ups in 2 minutes",
      "Top performers felicitated on the spot",
    ],
  },
  {
    id: "selection-felicitation-may-2026",
    title: "Selection Felicitation",
    subtitle: "Honouring students selected in Army & Police recruitment",
    category: "Selection Felicitation",
    date: new Date("2026-05-30T16:00:00"),
    dateLabel: "30 May 2026",
    time: "04:00 PM – 06:00 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "A felicitation ceremony celebrating students who cleared Army and Bihar Police recruitment this season, with certificates and words of guidance for juniors.",
    highlights: [
      "Certificates for all selected candidates",
      "Success stories shared with juniors",
      "Group photo and refreshments",
    ],
  },
  {
    id: "career-guidance-apr-2026",
    title: "Career Guidance Seminar",
    subtitle: "Choosing the right government exam path",
    category: "Career Guidance Seminar",
    date: new Date("2026-04-12T16:00:00"),
    dateLabel: "12 April 2026",
    time: "04:00 PM – 06:00 PM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "A guidance session helping students map their age, education, and fitness level to the most suitable defence or police exam track.",
    highlights: [
      "Eligibility comparison across exams",
      "Personalised guidance for parents & students",
      "Roadmap handout for the coming year",
    ],
  },
  {
    id: "sports-competition-mar-2026",
    title: "Sports Competition",
    subtitle: "Inter-batch athletics meet",
    category: "Sports Competition",
    date: new Date("2026-03-08T05:00:00"),
    dateLabel: "8 March 2026",
    time: "05:00 AM – 09:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "Morning and evening batches competed in track events, long jump, and relay races, building the competitive edge needed for selection day.",
    highlights: [
      "100m, 400m & 1.6 km races",
      "Long jump and relay events",
      "Medals for top three in each event",
    ],
  },
  {
    id: "academy-celebration-jan-2026",
    title: "Republic Day Academy Celebration",
    subtitle: "Flag hoisting and cultural programme",
    category: "Academy Celebrations",
    date: new Date("2026-01-26T08:00:00"),
    dateLabel: "26 January 2026",
    time: "08:00 AM – 10:00 AM",
    venue: "K.R.K. Ground, Lakhisarai",
    status: "Closed",
    description:
      "Students and families gathered for flag hoisting, a march-past by the academy's Army-aspirant batch, and a short cultural programme.",
    highlights: [
      "Flag hoisting ceremony",
      "March-past by senior batch",
      "Sweets and group photographs",
    ],
  },
];

// DUMMY DATA — gallery tile labels shown on the /events page.
export const GALLERY_GROUPS: { label: string; icon: LucideIcon }[] = [
  { label: "Training Moments", icon: Dumbbell },
  { label: "Award Ceremony", icon: Trophy },
  { label: "Group Photos", icon: Users },
  { label: "Practice Sessions", icon: Target },
];

// DUMMY DATA — video cards shown on the /events page.
export const VIDEOS: { title: string; href: string }[] = [
  { title: "Army Preparation Camp — Highlights", href: "https://youtube.com" },
  { title: "Selection Felicitation 2026", href: "https://youtube.com" },
  { title: "Bihar Police Camp — Mock PST", href: "https://youtube.com" },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WHATSAPP_NUMBER = "919999999999"; 