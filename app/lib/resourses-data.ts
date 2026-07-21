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
import type { DbResource } from "./action/resources";

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

export const RESOURCE_CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  downloads: number;
  hasVideo: boolean;
  fileUrl: string | null;
  videoUrl: string | null;
}

export function mapDbResourceToResourceItem(db: DbResource): ResourceItem {
  return {
    id: db.id,
    title: db.title,
    description: db.description,
    category: db.category,
    publishDate: new Date(db.publish_date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    downloads: db.downloads,
    hasVideo: db.has_video,
    fileUrl: db.file_url,
    videoUrl: db.video_url,
  };
}