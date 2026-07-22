import type { Metadata } from "next";
import AdmissionForm from "./_AdmissionForm";

export const metadata: Metadata = {
  title: "Online Admission Form | Admission 2026",
  description:
    "Apply for admission online. Fill in your personal, contact, educational, and course details — our admission team will reach out with your Admission ID and next steps.",
};

export default function AdmissionPage() {
  return <AdmissionForm />;
}