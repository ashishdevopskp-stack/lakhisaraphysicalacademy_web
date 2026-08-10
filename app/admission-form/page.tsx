import { redirect } from "next/navigation";
import { PLAY_STORE_URL } from "../lib/constants";

export const metadata = {
  title: "Online Admission | Lakhisarai Physical Academy App",
  description: "Download Lakhisarai Physical Academy official mobile app for admission and training guidance.",
};

export default function AdmissionPage() {
  redirect(PLAY_STORE_URL);
}