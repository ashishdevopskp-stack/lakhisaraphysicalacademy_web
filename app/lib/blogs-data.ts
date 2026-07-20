export const BLOG_CATEGORY_LABELS = [
  "Army Preparation", "Bihar Police", "Daroga (SI)", "SSC GD", "Railway",
  "Defence & Paramilitary", "Physical Training", "Fitness & Workout",
  "Diet & Nutrition", "Running Tips", "Exam Preparation", "Recruitment News",
  "Student Success Stories", "Academy Updates", "General Knowledge", "Motivation",
] as const;

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  author: string;
  publishDate: string;
  category: string;
  readingTime: string | null;
  views: number;
  hasVideo: boolean;
  hasPdf: boolean;
  videoUrl: string | null;
  pdfUrl: string | null;
  imageUrl: string | null;
}