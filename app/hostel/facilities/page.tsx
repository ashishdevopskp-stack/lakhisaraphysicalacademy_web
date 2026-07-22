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
} from "lucide-react";
import Container from "../../components/Container";
import { SectionGlow, HostelSubNav } from "../_shared";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "../_HostelMotion";

export const metadata = {
  title: "Hostel Facilities | Lakhisarai Physical Academy",
  description:
    "Explore hostel facilities at Lakhisarai Physical Academy: furnished rooms, mess, RO water, power backup, Wi-Fi, self-study area and more.",
};

const OVERVIEW = [
  "Safe & Secure Environment",
  "Comfortable Rooms",
  "Healthy & Hygienic Food",
  "24×7 Water & Electricity",
  "Clean Washrooms",
  "Peaceful Study Atmosphere",
  "Walking Distance from Academy",
  "Discipline & Regular Monitoring",
];

const FACILITIES = [
  { label: "Furnished Rooms", icon: BedDouble },
  { label: "Mess Facility", icon: Utensils },
  { label: "Clean Bathrooms", icon: ShowerHead },
  { label: "RO Drinking Water", icon: Droplets },
  { label: "Power Backup", icon: BatteryCharging },
  { label: "Wi-Fi (If Available)", icon: Wifi },
  { label: "Self Study Area", icon: BookOpen },
  { label: "Regular Cleaning", icon: Sparkles },
  { label: "Near Training Ground", icon: MapPin },
  { label: "Safe Environment", icon: ShieldCheck },
] as const;

function FacilitiesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <SectionGlow />
      <Container>
        <FadeInUp>
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
            Hostel
          </p>
          <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
            Hostel <span className="text-gradient-brand">Facilities</span>
          </h1>
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
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="font-display text-[22px] font-bold sm:text-[28px]">
            At a Glance
          </h2>
        </ScrollFadeUp>
        <StaggerList
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.05}
        >
          {OVERVIEW.map((item) => (
            <StaggerItem key={item} className="card-flat flex items-center gap-3 px-4 py-4">
              <ShieldCheck size={16} className="shrink-0 text-signal" />
              <span className="font-body text-[13px] text-text">{item}</span>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function FacilitiesGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="font-display text-[22px] font-bold sm:text-[28px]">
            What's Included
          </h2>
        </ScrollFadeUp>
        <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5" staggerDelay={0.04}>
          {FACILITIES.map(({ label, icon: Icon }) => (
            <StaggerItem
              key={label}
              className="card-flat flex flex-col items-center gap-2 px-3 py-5 text-center"
            >
              <Icon size={20} className="text-signal" />
              <span className="font-body text-[12px] text-text-muted">{label}</span>
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