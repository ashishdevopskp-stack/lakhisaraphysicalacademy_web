"use client";

import Image from "next/image";
import { Phone, ClipboardList, MessageCircle, Star, Award, ShieldCheck, Flame, Zap } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

const PHONE_NUMBER = "917739776471";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'd like to know more about admission & running training at Lakhisarai Physical Academy."
);

const ABOUT_NAV = [
  { href: "/about", label: "Overview" },
  { href: "/about/founderanddirector", label: "Founder & Director" },
  { href: "/about/ourstory", label: "Our Story" },
  { href: "/about/whatwetrain", label: "What We Train" },
  { href: "/about/facilities", label: "Facilities" },
];

function AboutSubNav({ current }: { current: string }) {
  return (
    <nav aria-label="About section pages" className="flex flex-wrap items-center gap-2 py-1">
      {ABOUT_NAV.map((item) => {
        const active = item.href === current;
        return (
          <a
            key={item.href}
            href={item.href}
            className={
              active
                ? "rounded-full bg-[#ea580c] px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-[#c2410c] hover:scale-105"
                : "rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm transition-all hover:border-orange-500/40 hover:bg-orange-50/50 hover:text-[#ea580c]"
            }
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function AboutHero() {
  return (
    <section id="about" className="pb-12 pt-12 sm:pb-20 sm:pt-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: founder photo */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-2 border-orange-100 shadow-xl">
              <Image
                src="/ganeshsir.png"
                alt="Founder and Director of Lakhisarai Physical Academy"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl bg-slate-900 px-5 py-3.5 text-center shadow-2xl border border-orange-500/30">
              <p className="text-[11px] font-black uppercase tracking-wider text-[#ea580c]">
                Founder &amp; Director
              </p>
              <p className="mt-0.5 text-[15px] font-extrabold text-white">
                Ganesh Sir — Lakhisarai Physical Academy
              </p>
            </div>
          </div>

          {/* Right: copy + CTAs */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#ea580c]">
              About Us
            </p>

            <h1 className="mt-3 max-w-[18ch] text-[32px] sm:text-[42px] lg:text-[48px] py-1 leading-snug font-black text-slate-900">
              About <span className="text-[#ea580c]">Lakhisarai Physical Academy</span>
            </h1>

            <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-slate-700 font-medium">
              From the founder&rsquo;s vision to our dedicated physical training team, endurance methods, facilities, and thousands of successful candidate selections — here&rsquo;s everything to know about Lakhisarai Physical Academy.
            </p>

            <div className="mt-6">
              <AboutSubNav current="/about" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`tel:+${PHONE_NUMBER}`} variant="primary" icon={Phone}>
                Contact Now
              </Button>
              <Button href="#coaches" variant="secondary" icon={ClipboardList}>
                Meet Our Coaches
              </Button>
              <Button
                href={`https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                variant="whatsapp"
                icon={MessageCircle}
              >
                WhatsApp Enquiry
              </Button>
            </div>
          </div>
        </div>

        {/* Coach Mahesh Sir Profile Section */}
        <div id="coaches" className="mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#ea580c] bg-orange-50 rounded-full border border-orange-200">
              Expert Coaching Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              Meet Our Running Specialist — <span className="text-[#ea580c]">Coach Mahesh Sir</span>
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-2">
              Scientific running technique, 1600m speed building, &amp; athletic endurance training.
            </p>
          </div>

          <div className="bento-card bento-card-saffron p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg">
            {/* Mahesh Sir Photo */}
            <div className="lg:col-span-5 relative mx-auto w-full max-w-[340px] lg:max-w-none">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <Image
                  src="/maheshsir.jpg"
                  alt="Coach Mahesh Sir - Running Specialist Coach"
                  fill
                  sizes="(min-width: 1024px) 380px, 80vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="absolute -bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl bg-white px-4 py-2.5 text-center shadow-xl border border-orange-200">
                <p className="text-xs font-black text-slate-900 flex items-center justify-center gap-1">
                  <Flame size={14} className="text-[#ea580c]" />
                  Coach Mahesh Sir
                </p>
                <p className="text-[11px] font-bold text-[#ea580c]">Running Specialist Coach</p>
              </div>
            </div>

            {/* Mahesh Sir Bio Details */}
            <div className="lg:col-span-7 space-y-4 text-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#138808] border border-emerald-200 text-xs font-extrabold">
                <Zap size={14} />
                <span>1600m &amp; 1000m Endurance Specialist</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                Dedicated Physical &amp; Running Coach
              </h3>

              <p className="text-sm leading-relaxed text-slate-700 font-medium">
                Mahesh Sir is a dedicated Running Specialist Coach at Lakhisarai Physical Academy, committed to helping students achieve excellence in physical fitness and competitive running. With a disciplined training approach and deep understanding of endurance, speed, stamina, and race techniques, he guides aspirants towards success in various physical examinations and sports competitions.
              </p>

              <p className="text-sm leading-relaxed text-slate-700 font-medium">
                His coaching focuses on improving running performance through scientific training methods, personalized practice sessions, fitness assessments, and continuous motivation. Under his guidance, students develop not only physical strength and speed but also the confidence and determination required to excel in challenging selection processes.
              </p>

              <p className="text-sm leading-relaxed text-slate-700 font-bold bg-white p-4 rounded-2xl border border-orange-200 text-slate-900 shadow-sm">
                &ldquo;Mahesh Sir believes that consistency, discipline, and hard work are the keys to success. His mission is to help every student unlock their full potential and achieve their dream of serving the nation or excelling in athletics.&rdquo;
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/917903594008?text=${encodeURIComponent("Hi Coach Mahesh Sir, I would like to ask a question regarding physical training.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange text-xs py-3 px-6 font-black rounded-full shadow-lg flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>Ask Coach Mahesh Sir (+91 7903594008)</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutSubcategoryGrid() {
  const subcategories = [
    {
      title: "Founder & Director",
      subtitle: "Ganesh Sir's story, physical coaching background & vision",
      href: "/about/founderanddirector",
      icon: Star,
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-600",
      badge: "Leadership",
    },
    {
      title: "Our Story",
      subtitle: "From small training batches to Bihar's #1 physical academy",
      href: "/about/ourstory",
      icon: Award,
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-600",
      badge: "History",
    },
    {
      title: "What We Train",
      subtitle: "1600m Running, High Jump (Scissor/Tiger), Shot Put, Long Jump",
      href: "/about/whatwetrain",
      icon: Flame,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
      badge: "Training",
    },
    {
      title: "Academy Facilities",
      subtitle: "K.R.K Field ground setup, stopwatch timing & medical check",
      href: "/about/facilities",
      icon: ShieldCheck,
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-600",
      badge: "Ground",
    },
    {
      title: "Selections & Achievements",
      subtitle: "Hall of Fame record of 1,200+ selected candidates",
      href: "/about/achievements",
      icon: Award,
      color: "from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-600",
      badge: "Selections",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <Container>
        <div className="mb-8">
          <span className="px-3.5 py-1 text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] border border-orange-200 rounded-full">
            ⭐ Academy Subcategories &amp; Information
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Explore About Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subcategories.map((sub) => {
            const Icon = sub.icon;
            return (
              <a
                key={sub.href}
                href={sub.href}
                className="group rounded-3xl bg-slate-50 border-2 border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-amber-400 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${sub.color} border shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon size={20} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-orange-50 text-[#ea580c] border border-orange-200">
                      {sub.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#ea580c] transition-colors leading-tight">
                    {sub.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-1.5 leading-relaxed">
                    {sub.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-black text-[#ea580c]">
                  <span>View Details</span>
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

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutSubcategoryGrid />
    </>
  );
}