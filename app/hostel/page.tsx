// app/hostel/page.tsx

import { Building2, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { PHONE_NUMBER, whatsappHref, telHref } from "../lib/constants";
import { SectionGlow, HostelSubNav } from "./_shared";
import { FadeInUp, ScaleIn } from "./_HostelMotion";
import { HostelHeroImageShowcase } from "./_HostelHeroImageShowcase";

const HOSTEL_ENQUIRY_MESSAGE =
  "Hello Lakhisarai Physical Academy, I would like to apply for hostel accommodation. Please share the details.";

export const metadata = {
  title: "Hostel Facility | Lakhisarai Physical Academy",
  description:
    "Safe, comfortable & disciplined hostel accommodation for students, with meals, water, power backup and easy access to the training ground.",
};

function HostelHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24">
      <SectionGlow />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ---------------- Left: Dual Hostel Photos Showcase ---------------- */}
          <ScaleIn delay={0.15}>
            <HostelHeroImageShowcase />
          </ScaleIn>

          {/* ---------------- Right: copy + CTAs ---------------- */}
          <FadeInUp>
            <div className="mb-4">
              <HostelSubNav current="/hostel" />
            </div>

            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
              Hostel Campus
            </p>

            <h1 className="font-display mt-2 max-w-[20ch] text-[34px] font-black leading-[1.1] sm:text-[44px] lg:text-[52px] text-slate-900">
              Hostel <span className="text-[#ea580c]">Facility</span>
            </h1>

            <p className="font-body mt-4 text-[15.5px] font-bold text-slate-800">
              Safe, comfortable &amp; disciplined accommodation for outstation candidates.
            </p>

            <p className="font-body mt-3 max-w-[54ch] text-[15.5px] leading-relaxed text-slate-600 font-medium">
              Lakhisarai Physical Academy provides a secure and student-friendly hostel building with comfortable rooms, individual beds, storage shelves, nutritious mess meals, water &amp; power backup, and quick access to K.R.K Field, Lakhisarai ground.
            </p>


            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={whatsappHref(HOSTEL_ENQUIRY_MESSAGE)} variant="primary" icon={Building2}>
                Apply for Hostel
              </Button>
              <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
                WhatsApp Enquiry
              </Button>
              <Button href={telHref(PHONE_NUMBER)} variant="secondary" icon={Phone}>
                Contact Now
              </Button>
            </div>
          </FadeInUp>
        </div>
      </Container>
    </section>
  );
}

function HostelSubcategoryGrid() {
  const subcategories = [
    {
      title: "Hostel Rules & Discipline",
      subtitle: "Daily follow rules, timings, and resident code of conduct",
      href: "/hostel/rules",
      icon: ShieldCheck,
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600",
      badge: "Discipline",
    },
    {
      title: "Facilities & Security",
      subtitle: "Comfortable rooms, RO water, power backup & 24/7 security",
      href: "/hostel/facilities",
      icon: Building2,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
      badge: "Facilities",
    },
    {
      title: "Fee Structure",
      subtitle: "Transparent monthly hostel lodging & meal fee breakdown",
      href: "/hostel/fees",
      icon: Phone,
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600",
      badge: "Pricing",
    },
    {
      title: "Campus Gallery",
      subtitle: "Real photos of hostel building, rooms, mess hall & ground",
      href: "/hostel/gallery",
      icon: Building2,
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-600",
      badge: "Photos",
    },
    {
      title: "Hostel FAQ",
      subtitle: "Frequently asked questions regarding hostel admission & stay",
      href: "/hostel/faq",
      icon: MessageCircle,
      color: "from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-600",
      badge: "FAQ",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <Container>
        <div className="mb-8">
          <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#138808] border border-emerald-300 rounded-full">
            🏨 Hostel Sections &amp; Subcategories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Explore Hostel Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subcategories.map((sub) => {
            const Icon = sub.icon;
            return (
              <a
                key={sub.href}
                href={sub.href}
                className="group rounded-3xl bg-slate-50 border-2 border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-emerald-500 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${sub.color} border shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-[#138808] border border-emerald-200">
                      {sub.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#138808] transition-colors leading-tight">
                    {sub.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed">
                    {sub.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-black text-[#138808]">
                  <span>Explore Section</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function Hostel() {
  return (
    <>
      <HostelHero />
      <HostelSubcategoryGrid />
    </>
  );
}