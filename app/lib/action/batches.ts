"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export interface DbBatch {
  id: string;
  name: string;
  category: string;
  time: string;
  location: string;
  target_exam: string;
  capacity: number;
  status: string;
  highlights: string;
  created_at?: string;
}

const DEFAULT_BATCHES: DbBatch[] = [
  {
    id: "batch-1",
    name: "Morning Physical Training Batch (मॉर्निंग फिजिकल)",
    category: "Physical",
    time: "05:00 AM - 07:30 AM",
    location: "K.R.K Field, Lakhisarai",

    target_exam: "Bihar Police Constable, SI, Army Agniveer, RPF",
    capacity: 150,
    status: "Filling Fast",
    highlights:
      "1600m / 1000m Running Technique & Endurance\nHigh Jump Training (Tiger & Scissor style)\nShot Put (गोला फेंक) & Long Jump Drills\nDaily Stamina & Stretches under NIS Coach",
  },
  {
    id: "batch-2",
    name: "Evening Physical & Stamina Batch (ईवनिंग बैच)",
    category: "Physical",
    time: "04:30 PM - 06:30 PM",
    location: "Lakhisarai Sports Complex Ground",
    target_exam: "SSC GD Physical Test, SSC CPO, Home Guard",
    capacity: 100,
    status: "Open",
    highlights:
      "Weight loss & Sprinting technique\nCore & Leg Strength conditioning\nIndividual Timing assessment every Saturday",
  },
  {
    id: "batch-3",
    name: "Written Exam Mastery Batch (लिखित परीक्षा स्पेशल)",
    category: "Written",
    time: "10:30 AM - 01:30 PM",
    location: "Lakhisarai Academy Classroom Center",
    target_exam: "Bihar Police CSBC, BPSSC SI, SSC GD Written",
    capacity: 80,
    status: "Open",
    highlights:
      "Bihar GK, Samanya Vigyan & General Studies\nMaths & Reasoning Shortcut Methods\nWeekly Mock Test with OMR Evaluation",
  },
  {
    id: "batch-4",
    name: "Sunday Special Time Trial & Medical Screening",
    category: "Combo",
    time: "06:00 AM - 09:30 AM",
    location: "Academy Ground",
    target_exam: "All Defence & Police Aspirants",
    capacity: 200,
    status: "Open",
    highlights:
      "Exact 1600m Digital Timer Run Test\nBody Measurement (Height, Chest, Weight)\nFlat foot, Knock Knee & Eye Sight Initial Check",
  },
];

export async function getBatches(): Promise<DbBatch[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("batches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_BATCHES;
    }
    return data as DbBatch[];
  } catch {
    return DEFAULT_BATCHES;
  }
}

export async function getBatch(id: string): Promise<DbBatch | null> {
  const batches = await getBatches();
  return batches.find((b) => b.id === id) || null;
}

export async function createBatch(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "Physical").trim();
  const time = String(formData.get("time") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const targetExam = String(formData.get("targetExam") || "").trim();
  const capacity = Number(formData.get("capacity")) || 100;
  const status = String(formData.get("status") || "Open").trim();
  const highlights = String(formData.get("highlights") || "").trim();

  if (!name || !time) {
    redirect("/admin/batches?error=Name+and+Time+are+required");
  }

  const { error } = await supabase.from("batches").insert({
    name,
    category,
    time,
    location,
    target_exam: targetExam,
    capacity,
    status,
    highlights,
  });

  if (error) {
    console.error("createBatch DB error:", error.message);
  }

  revalidatePath("/admin/batches");
  revalidatePath("/courses/schedule");
  revalidatePath("/courses/programs");
  revalidatePath("/");
  redirect("/admin/batches");
}

export async function updateBatch(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "Physical").trim();
  const time = String(formData.get("time") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const targetExam = String(formData.get("targetExam") || "").trim();
  const capacity = Number(formData.get("capacity")) || 100;
  const status = String(formData.get("status") || "Open").trim();
  const highlights = String(formData.get("highlights") || "").trim();

  const { error } = await supabase
    .from("batches")
    .update({
      name,
      category,
      time,
      location,
      target_exam: targetExam,
      capacity,
      status,
      highlights,
    })
    .eq("id", id);

  if (error) {
    console.error("updateBatch DB error:", error.message);
  }

  revalidatePath("/admin/batches");
  revalidatePath("/courses/schedule");
  revalidatePath("/courses/programs");
  revalidatePath("/");
  redirect("/admin/batches");
}

export async function deleteBatch(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("batches").delete().eq("id", id);
  if (error) {
    console.error("deleteBatch DB error:", error.message);
  }

  revalidatePath("/admin/batches");
  revalidatePath("/courses/schedule");
  revalidatePath("/");
}
