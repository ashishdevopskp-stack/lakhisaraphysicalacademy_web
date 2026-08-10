// app/hostel/facilities/page.tsx

import {
  BedDouble,
  Utensils,
  ShowerHead,
  Droplets,
  BatteryCharging,
  Wifi,
  BookOpen,
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Building2,
} from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, HostelSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_HostelMotion";

export const metadata = {
  title: "Hostel Facilities | Lakhisarai Physical Academy",
  description:
    "Explore hostel facilities at Lakhisarai Physical Academy: furnished rooms, mess, RO water, power backup, Wi-Fi, self-study area and more.",
};

const AT_A_GLANCE = [
  {
    title: "Safe & Secure Environment",
    desc: "24/7 CCTV surveillance & hostel warden monitoring for physical aspirants.",
    icon: ShieldCheck,
    badge: "24/7 Security",
    gradient: "from-orange-500/10 via-amber-500/5 to-transparent",
  },
  {
    title: "Comfortable Rooms",
    desc: "Spacious rooms with individual beds, fans, and storage shelves for luggage.",
    icon: BedDouble,
    badge: "Personal Beds",
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  },
  {
    title: "Healthy & Hygienic Mess",
    desc: "Freshly cooked nutritious meals designed for high-energy physical training.",
    icon: Utensils,
    badge: "3 Daily Meals",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    title: "24×7 Power & Water",
    desc: "Uninterrupted power generator backup & continuous running tap water.",
    icon: BatteryCharging,
    badge: "Full Power Backup",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Clean Washrooms",
    desc: "Regularly sanitized modern bathrooms & clean shower facilities.",
    icon: ShowerHead,
    badge: "Hygiene First",
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    title: "Peaceful Study Atmosphere",
    desc: "Dedicated self-study area for written exam prep (Defence/Police syllabus).",
    icon: BookOpen,
    badge: "Study Friendly",
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    title: "Near K.R.K Field Ground",
    desc: "Just a 2-minute walk to K.R.K Field physical training ground.",

    icon: MapPin,
    badge: "Prime Location",
    gradient: "from-rose-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Discipline & Monitoring",
    desc: "Strict attendance, regular physical check-ins, and curfew discipline.",
    icon: Clock,
    badge: "Strict Rules",
    gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
  },
];

const INCLUDED_FACILITIES = [
  {
    label: "Furnished Rooms",
    desc: "Equipped with beds, fans & shelves",
    icon: BedDouble,
    tag: "Essential",
  },
  {
    label: "Mess Facility",
    desc: "Nutritious breakfast, lunch & dinner",
    icon: Utensils,
    tag: "Dietary",
  },
  {
    label: "Clean Bathrooms",
    desc: "Daily sanitized washrooms & showers",
    icon: ShowerHead,
    tag: "Sanitized",
  },
  {
    label: "RO Drinking Water",
    desc: "100% pure filtered drinking water",
    icon: Droplets,
    tag: "Clean Water",
  },
  {
    label: "Power Backup",
    desc: "Heavy-duty generator 24x7 support",
    icon: BatteryCharging,
    tag: "24x7 Power",
  },
  {
    label: "High-Speed Wi-Fi",
    desc: "Fast internet for online video studies",
    icon: Wifi,
    tag: "Study Tech",
  },
  {
    label: "Self Study Area",
    desc: "Quiet hall for daily homework & tests",
    icon: BookOpen,
    tag: "Exam Prep",
  },
  {
    label: "Regular Cleaning",
    desc: "Housekeeping & waste disposal",
    icon: Sparkles,
    tag: "Hygienic",
  },
  {
    label: "Near Training Ground",
    desc: "Quick access to 1600m running track",
    icon: MapPin,
    tag: "Ground Access",
  },
  {
    label: "Safe Environment",
    desc: "Guarded gates & warden supervision",
    icon: ShieldCheck,
    tag: "Protected",
  },
] as const;

function FacilitiesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <SectionGlow />
      <Container>
        <FadeInUp>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
            Hostel Campus
          </p>
          <h1 className="font-display mt-4 max-w-[24ch] text-[34px] font-black leading-[1.1] sm:text-[44px] text-slate-900">
            Hostel <span className="text-[#ea580c]">Facilities &amp; Amenities</span>
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600 max-w-xl">
            Everything you need for a comfortable stay, athletic recovery, and focused written exam preparation.
          </p>

          <div className="mt-8">
            <HostelSubNav current="/hostel/facilities" />
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

function HostelOverview() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50/50">
      <Container>
        <ScrollFadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] rounded-full">
              Hostel Key Highlights
            </span>
            <h2 className="font-display text-[26px] font-black sm:text-[34px] text-slate-900 mt-2">
              At a Glance
            </h2>
          </div>
          <p className="text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
            8 Core Campus Standards
          </p>
        </ScrollFadeUp>

        <StaggerList
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.05}
        >
          {AT_A_GLANCE.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className={`relative h-full overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}>
                  {/* Subtle Background Gradient */}
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 shadow-sm group-hover:scale-110 transition-transform">
                        <Icon size={22} />
                      </div>

                      <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 rounded-md border border-slate-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-extrabold text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Included in Hostel Admission</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Container>
    </section>
  );
}

function FacilitiesGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollFadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] rounded-full">
              Full Amenity List
            </span>
            <h2 className="font-display text-[26px] font-black sm:text-[34px] text-slate-900 mt-2">
              What&apos;s Included in Your Stay
            </h2>
          </div>
          <p className="text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
            10 Essential Amenities
          </p>
        </ScrollFadeUp>

        <StaggerList
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          staggerDelay={0.04}
        >
          {INCLUDED_FACILITIES.map(({ label, desc, icon: Icon, tag }) => (
            <StaggerItem key={label}>
              <div className="group h-full flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#ea580c] border border-orange-200 group-hover:bg-[#ea580c] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                      {tag}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-extrabold text-slate-900 group-hover:text-[#ea580c] transition-colors mt-2">
                    {label}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 leading-normal">
                    {desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function HostelFacilitiesPage() {
  return (
    <>
      <FacilitiesHero />
      <HostelOverview />
      <FacilitiesGrid />
    </>
  );
}