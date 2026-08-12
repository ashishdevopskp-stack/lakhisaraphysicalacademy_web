import { Wallet, ClipboardList, CheckCircle2, ShieldCheck, Home, Utensils, Wifi, Sparkles } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { HostelSubNav } from "../_shared";
import { StaggerList, StaggerItem, ScrollFadeUp } from "../_HostelMotion";
import { whatsappHref } from "@/app/lib/constants";

export const metadata = {
  title: "Hostel Fees | Lakhisarai Physical Academy",
  description:
    "Monthly Hostel fee structure — ₹5,000/month inclusive of lodging, hygienic mess food, 24/7 RO water, and security.",
};

const INCLUDED_FACILITIES = [
  { icon: Home, text: "Lodging (Spacious Clean Rooms & Bed)" },
  { icon: Utensils, text: "3 Time Hygienic Mess Meals (Bhojanalaya)" },
  { icon: ShieldCheck, text: "24/7 Security & CCTV Supervision" },
  { icon: Sparkles, text: "RO Purified Drinking Water & Electricity" },
  { icon: Wifi, text: "High-Speed Student WiFi & Self-Study Room" },
];

function FeesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-20 bg-gradient-to-b from-orange-50/70 via-[#faf7f0] to-white border-b border-orange-200/60">
      <Container>
        <div className="mb-8">
          <HostelSubNav current="/hostel/fees" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 text-xs font-black text-orange-800 shadow-2xs mb-4">
          <Home size={14} className="text-orange-600" />
          <span>IN-CAMPUS HOSTEL &amp; BHOJANALAYA</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
          Hostel <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">Fee Structure &amp; Pricing</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg font-bold text-slate-800 leading-relaxed max-w-2xl">
          Affordable, transparent hostel lodging and mess fee structure for outstation candidates preparing for Bihar Police &amp; Army.
        </p>
      </Container>
    </section>
  );
}

function FeesGrid() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50">
      <Container>
        <div className="max-w-xl mx-auto">
          <div className="rounded-3xl bg-white border-2 border-orange-200 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500" />

            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
                All-Inclusive Monthly Package
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                🟢 Admission Open
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Monthly Hostel &amp; Mess Fee
            </h3>

            <div className="my-4 p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-center">
              <span className="text-4xl sm:text-5xl font-black text-orange-600 tracking-tight">
                ₹5,000
              </span>
              <span className="text-sm font-extrabold text-slate-600 ml-1">/ Month</span>
              <p className="text-xs font-bold text-slate-500 mt-1">
                (Payable in single installment per month • Non-refundable)
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                Included Amenities:
              </p>

              {INCLUDED_FACILITIES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="p-2 rounded-xl bg-orange-100 text-orange-700 shrink-0">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href={whatsappHref("Hello Lakhisarai Physical Academy, I want to book hostel seat for physical training.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ClipboardList size={18} />
                <span>Book Hostel Seat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HostelFeesPage() {
  return (
    <>
      <FeesHero />
      <FeesGrid />
    </>
  );
}