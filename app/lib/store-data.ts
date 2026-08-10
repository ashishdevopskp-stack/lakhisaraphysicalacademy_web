import type { LucideIcon } from "lucide-react";
import {
  Shirt,
  Footprints,
  Dumbbell,
  Droplets,
  BookOpen,
  Gift,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Timer,
  Truck,
  Store as StoreIcon,
  Sparkles,
  Flame,
  Crown,
} from "lucide-react";

/* =========================================================
   STORE DATA — static content for the /store page (categories,
   offers, delivery info, FAQs). Product listings now come live
   from Supabase via getProducts() — see app/lib/action/products.ts
   and app/store/page.tsx. This file only holds the Product type
   and the static sections below.
   ========================================================= */

export interface CategoryGroup {
  label: string;
  icon: LucideIcon;
  items: string[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "Sports Wear",
    icon: Shirt,
    items: ["Sports T-Shirts", "Track Suits", "Shorts", "Lowers", "Jackets", "Caps"],
  },
  {
    label: "Footwear",
    icon: Footprints,
    items: ["Running Shoes", "Training Shoes", "Sports Socks"],
  },
  {
    label: "Fitness Equipment",
    icon: Dumbbell,
    items: [
      "Skipping Rope",
      "Resistance Bands",
      "Hand Gripper",
      "Push-Up Bar",
      "Exercise Mat",
      "Cones & Markers",
      "Stopwatch",
    ],
  },
  {
    label: "Accessories",
    icon: Droplets,
    items: [
      "Water Bottle",
      "Gym Bag / Backpack",
      "Towel",
      "Shaker Bottle",
      "Knee Support",
      "Elbow Support",
      "Wrist Band",
    ],
  },
  {
    label: "Study Materials",
    icon: BookOpen,
    items: [
      "Physical Test Guide Books",
      "Practice Notes",
      "Current Affairs Booklets",
      "Previous Year Papers",
      "Academy Study Materials",
    ],
  },
  {
    label: "Academy Merchandise",
    icon: Gift,
    items: [
      "Academy T-Shirts",
      "Academy Track Suits",
      "Academy Cap",
      "Academy Bag",
      "Academy Bottle",
    ],
  },
];

export type Availability = "In Stock" | "Limited Stock" | "Out of Stock" | "Pre-Order" | "Unpublished";

export interface Product {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  availability: Availability;
  offer?: string;
  imageUrl?: string;
  description?: string;
}

export const AVAILABILITY_STYLES: Record<Availability, { className: string; icon: LucideIcon }> = {
  "In Stock": { className: "text-[#138808]", icon: CheckCircle2 },
  "Limited Stock": { className: "text-[#ea580c]", icon: AlertTriangle },
  "Out of Stock": { className: "text-slate-400", icon: XCircle },
  "Pre-Order": { className: "text-[#000080]", icon: Timer },
  "Unpublished": { className: "text-slate-400", icon: XCircle },
};

export const OFFERS: { label: string; description: string; icon: LucideIcon }[] = [
  {
    label: "New Arrivals",
    description: "Freshly stocked training gear",
    icon: Sparkles,
  },
  {
    label: "Best Sellers",
    description: "Most ordered by academy students",
    icon: Flame,
  },
  {
    label: "Seasonal Offers",
    description: "Limited-time discounted bundles",
    icon: Timer,
  },
  {
    label: "Academy Exclusive",
    description: "Official Lakhisarai Academy merchandise",
    icon: Crown,
  },
];

export const DELIVERY_ROWS: { label: string; detail: string; icon: LucideIcon }[] = [
  { icon: Truck, label: "Delivery Available", detail: "Shipped across Bihar and select pin codes" },
  { icon: StoreIcon, label: "Pickup from Academy", detail: "Collect directly from the academy campus" },
  { icon: Timer, label: "Estimated Delivery Time", detail: "3–7 working days after order confirmation" },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "How can I order a product?",
    a: "Tap 'Order Now' on any product card, enter your delivery details, name, and mobile number. Your order will be placed directly in our system and our academy team will contact you to confirm shipping.",
  },
  {
    q: "Is home delivery available?",
    a: "Yes, delivery is available across Bihar and select pin codes. Estimated delivery time is 3–7 working days after order confirmation.",
  },
  {
    q: "Can I buy products directly from the academy?",
    a: "Yes, you can visit the academy in person and pick up available products directly from our campus store.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, cash on delivery / pickup, and direct bank transfer.",
  },
  {
    q: "Is product exchange available?",
    a: "Size or defect-related exchanges are available for select items. Please reach out to academy support within 3 days of delivery.",
  },
];