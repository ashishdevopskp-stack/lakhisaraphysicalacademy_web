"use client";

import Image from "next/image";
import {
  ClipboardList,
  Phone,
  ArrowRight,
  Star,
  ShieldCheck,
  MapPin,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Flag,
  MessageCircle,
} from "lucide-react";
import Container from "../components/Container";

const PHONE_NUMBER = "917739776471";

export default function Hero() {

  return (
    <section id="top" className="pb-12 pt-3 sm:pb-20 sm:pt-5 overflow-hidden">
      <Container>

        {/* Main Bento Layout Grid with Tiranga Saffron, White, & India Green Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Hero Header & Stats (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Top Saffron Bento Card */}
            <div className="bento-card bento-card-saffron p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
              <div>
                {/* Tiranga Saffron Top Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#c2410c] border border-orange-300 text-xs font-extrabold mb-4">
                  <Flag className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>जय हिन्द! #1 Physical Training Academy in Lakhisarai</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                  Serve the Nation!{" "}
                  <span className="text-[#ea580c]">Join Lakhisarai Physical Academy Now</span>
                </h1>

                <p className="mt-4 text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  Dedicated physical training for 1600m Running, High Jump, Long Jump, &amp; Shot Put guided by expert NIS coaches with patriotic discipline.
                </p>
              </div>

              {/* Action Pill CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Apply for Admission (App)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>


                <a
                  href={`tel:+${PHONE_NUMBER}`}
                  className="btn-secondary-pill"
                >
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span>Call +91 77397 76471</span>
                </a>
              </div>
            </div>

            {/* Indian Tiranga Tricolor Banner (Saffron -> White -> Green Gradient Banner) */}
            <div className="rounded-3xl bg-gradient-to-r from-[#ea580c] via-[#ff9933] to-[#138808] p-6 sm:p-8 text-white shadow-xl shadow-orange-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-2 border-white">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-100 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-white" />
                  <span>Proven Selection Wall (भारत माता की जय)</span>
                </p>
                <p className="text-4xl sm:text-5xl font-black mt-1 tracking-tight drop-shadow-md">
                  1,200+
                </p>
                <p className="text-sm font-extrabold text-white mt-1">
                  Selections in Bihar Police, Indian Army, SI &amp; SSC GD
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 shrink-0 text-left shadow-inner">
                <div className="flex items-center gap-1 text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-300" />
                  ))}
                </div>
                <p className="text-xs font-extrabold mt-1 text-white">4.9 / 5.0 Rating</p>
                <p className="text-[11px] font-bold text-amber-100">250+ Verified Candidate Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Course & Coach Cards (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Featured Academy Card with Green Accent Border */}
            <div className="bento-card bento-card-green p-5 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 ring-2 ring-[#138808]/20">
                <Image
                  src="/heroimg.png"
                  alt="Training Ground"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold rounded-full shadow-sm">
                  K.R.K Field, Lakhisarai
                </span>
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#ea580c] text-white text-xs font-extrabold rounded-full shadow-sm">
                  Daily Morning 5:00 AM
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">
                    Physical Fitness Batch 2026
                  </h3>
                  <span className="text-xs font-extrabold text-[#138808] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300">
                    Active Batch
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-600 mt-1 flex items-center gap-1">
                  <MapPin size={13} className="text-[#ea580c]" />
                  K.R.K Field, Lakhisarai
                </p>


                {/* Specs Grid */}
                <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-500">Running</p>
                    <p className="text-xs font-extrabold text-slate-900 mt-0.5">1600m / 1000m</p>
                  </div>
                  <div className="border-x border-slate-200">
                    <p className="text-[10px] uppercase font-black text-slate-500">High Jump</p>
                    <p className="text-xs font-extrabold text-slate-900 mt-0.5">Scissor/Tiger</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-500">Shot Put</p>
                    <p className="text-xs font-extrabold text-slate-900 mt-0.5">16lb / 12lb</p>
                  </div>
                </div>

                <a
                  href={`tel:+${PHONE_NUMBER}`}
                  className="w-full mt-4 btn-orange text-center justify-center text-sm py-2.5"
                >
                  Join Physical Batch Now
                </a>
              </div>
            </div>

            {/* Grid of Coaches (Ganesh Sir & Coach Mahesh Sir) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Ganesh Sir Card */}
              <div className="bento-card bento-card-navy p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#000080]/30 shrink-0 ring-2 ring-orange-500/30">
                    <Image
                      src="/ganeshsir.png"
                      alt="Ganesh Sir"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-slate-900 leading-tight truncate">
                      Ganesh Sir
                    </h4>
                    <p className="text-[10px] font-bold text-slate-600 truncate">
                      Founder &amp; NIS Coach
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">Physical Chief</span>
                  <a
                    href={`https://wa.me/${PHONE_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 text-[10px] font-extrabold text-[#138808] bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-300 transition-colors shrink-0"
                  >
                    Chat
                  </a>
                </div>
              </div>

              {/* Coach Mahesh Sir Card */}
              <div className="bento-card bento-card-saffron p-3.5 flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-orange-400 shrink-0 ring-2 ring-orange-500/30">
                    <Image
                      src="/maheshsir.jpg"
                      alt="Coach Mahesh Sir"
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-slate-900 leading-tight truncate">
                      Mahesh Sir
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#ea580c] truncate">
                      Running Specialist
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">1600m Speed</span>
                  <a
                    href="/about#coaches"
                    className="px-2.5 py-1 text-[10px] font-extrabold text-[#ea580c] bg-orange-50 hover:bg-orange-100 rounded-full border border-orange-300 transition-colors shrink-0"
                  >
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards Strip with Tiranga Colors */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bento-card p-4 flex items-center gap-3 border-t-4 border-t-[#ea580c]">
            <div className="p-2.5 rounded-xl bg-orange-50 text-[#ea580c]">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Digital Timing Test</p>
              <p className="text-[11px] font-medium text-slate-600">Exact OMR &amp; Stop-watch run</p>
            </div>
          </div>

          <div className="bento-card p-4 flex items-center gap-3 border-t-4 border-t-[#000080]">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#000080]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Medical Checkup</p>
              <p className="text-[11px] font-medium text-slate-600">Knock knee &amp; flat foot check</p>
            </div>
          </div>

          <div className="bento-card p-4 flex items-center gap-3 border-t-4 border-t-[#138808]">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#138808]">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Hostel &amp; Mess</p>
              <p className="text-[11px] font-medium text-slate-600">Available for outstation candidates</p>
            </div>
          </div>

          <div className="bento-card p-4 flex items-center gap-3 border-t-4 border-t-[#ff9933]">
            <div className="p-2.5 rounded-xl bg-amber-50 text-[#ea580c]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Sunday Time Trial</p>
              <p className="text-[11px] font-medium text-slate-600">Weekly evaluation test run</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}