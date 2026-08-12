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
  Smartphone,
  Download,
} from "lucide-react";
import Container from "../components/Container";
import BannerSlider from "../components/BannerSlider";
import { DbBanner } from "../lib/action/banners";

const PHONE_NUMBER = "917739776471";

export default function Hero({ banners }: { banners?: DbBanner[] }) {
  return (
    <section id="top" className="pb-12 pt-3 sm:pb-20 sm:pt-5 overflow-hidden">
      <Container>
        {/* Top Announcement Cards: 1. WhatsApp Channel | 2. Download Our App (Sky Blue Theme) */}
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Card 1: WhatsApp Channel */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-950 p-4 text-white shadow-lg border border-emerald-500/30 flex flex-col justify-between gap-3 group hover:border-emerald-400/50 transition-all">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 mt-0.5">
                <MessageCircle size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span>📢 Official WhatsApp Channel</span>
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                  Join Lakhisarai Physical Academy Official Channel for Daily Ground &amp; Exam Updates!
                </p>
              </div>
            </div>

            <a
              href="https://whatsapp.com/channel/0029VaAoQ1gDjiOa3By7bM3s"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02]"
            >
              <span>Join WhatsApp Channel</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 2: Download Our App (Sky Blue Theme) */}
          <div className="rounded-2xl bg-gradient-to-r from-sky-900 via-sky-950 to-slate-950 p-4 text-white shadow-lg border border-sky-400/40 flex flex-col justify-between gap-3 group hover:border-sky-300/60 transition-all">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-400/20 text-sky-300 border border-sky-400/40 shrink-0 mt-0.5">
                <Smartphone size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-black uppercase tracking-wider text-sky-300 flex items-center gap-1">
                  <span>📱 Official Mobile App</span>
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                  Download Academy App for Online Admissions, Batches &amp; Bhojan Token!
                </p>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-4 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.02]"
            >
              <Download size={14} />
              <span>Download Our App (Play Store)</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Army Academy Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Hero Header & Stats (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Top Army Olive Bento Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#2D3A1E] via-[#243116] to-[#17230D] p-6 sm:p-8 lg:p-10 text-white shadow-2xl border-2 border-[#D4AF37]/40 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Background Tactical Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

              <div className="relative z-10">
                {/* Army Emblem Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-black mb-4 backdrop-blur-md">
                  <Flag className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>जय हिन्द! #1 Defence &amp; Police Physical Academy</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                  Serve the Nation! Join{" "}
                  <span className="text-[#FF9933]">Lakhisarai Physical Academy</span>
                </h1>

                <p className="mt-4 text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                  Disciplined physical training for 1600m Running, High Jump, Long Jump &amp; Shot Put under expert military coaches with patriotic excellence.
                </p>
              </div>

              {/* Action CTAs */}
              <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#FF9933] hover:bg-[#e67e22] text-slate-950 font-black text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2.5 hover:scale-[1.02]"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Apply for Admission (App)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={`tel:+${PHONE_NUMBER}`}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-sm border border-white/30 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-[#D4AF37]" />
                  <span>Call +91 77397 76471</span>
                </a>
              </div>
            </div>

            {/* Indian Army Selections Dossier Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808] p-1 shadow-xl">
              <div className="bg-[#1E2813] rounded-[22px] p-6 sm:p-7 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[#D4AF37]/30">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#FF9933]" />
                    <span>Proven Selection Dossier (भारत माता की जय)</span>
                  </p>
                  <p className="text-4xl sm:text-5xl font-black mt-1 tracking-tight text-white drop-shadow-md">
                    1,200+
                  </p>
                  <p className="text-xs font-extrabold text-slate-300 mt-1">
                    Selections in Bihar Police, Indian Army Agniveer, SI &amp; SSC GD
                  </p>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-[#D4AF37]/40 shrink-0 text-left shadow-inner">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-xs font-extrabold mt-1 text-white">4.9 / 5.0 Rating</p>
                  <p className="text-[11px] font-bold text-slate-400">250+ Verified Candidate Reviews</p>
                </div>
              </div>
            </div>

            {/* Sliding Home Page Banner Placement matching user screenshot */}
            {banners && banners.length > 0 && (
              <BannerSlider banners={banners} className="mt-1" />
            )}
          </div>

          {/* Right Column: Featured Course Card & Coaches (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Featured Academy Video Card with Gold Border */}
            <div className="bento-card bg-white p-5 flex flex-col justify-between border-2 border-[#D4AF37]/40 shadow-xl">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 mb-4 ring-2 ring-[#138808]/30 group shadow-md">
                <video
                  src="/hero_video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover rounded-2xl"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-black rounded-full shadow-md flex items-center gap-1.5 border border-amber-500/40 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Ground Action Video</span>
                </span>
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#FF9933] text-slate-950 text-xs font-black rounded-full shadow-md pointer-events-none">
                  K.R.K Field, Lakhisarai
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

            {/* Grid of Coaches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Ganesh Sir Card */}
              <div className="rounded-2xl bg-white p-3.5 border-2 border-[#000080]/30 shadow-md flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#000080] shrink-0">
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
                      Founder &amp; Head Coach
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
              <div className="rounded-2xl bg-white p-3.5 border-2 border-[#FF9933]/40 shadow-md flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#FF9933] shrink-0">
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
                    <p className="text-[10px] font-extrabold text-[#c2410c] truncate">
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

        {/* Bottom Feature Cards Strip with Army & Tiranga Colors */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-t-4 border-t-[#FF9933] shadow-md">
            <div className="p-2.5 rounded-xl bg-orange-50 text-[#ea580c]">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Digital Timing Test</p>
              <p className="text-[11px] font-medium text-slate-600">Exact OMR &amp; Stop-watch run</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-t-4 border-t-[#000080] shadow-md">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#000080]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Medical Checkup</p>
              <p className="text-[11px] font-medium text-slate-600">Knock knee &amp; flat foot check</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-t-4 border-t-[#138808] shadow-md">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-[#138808]">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900">Hostel &amp; Mess</p>
              <p className="text-[11px] font-medium text-slate-600">Available for outstation candidates</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-t-4 border-t-[#D4AF37] shadow-md">
            <div className="p-2.5 rounded-xl bg-amber-50 text-[#D4AF37]">
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