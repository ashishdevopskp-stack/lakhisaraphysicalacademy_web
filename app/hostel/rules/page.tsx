// app/hostel/rules/page.tsx

import { ShieldCheck, CheckCircle2 } from "lucide-react";
import Container from "../../components/Container";
import { HostelSubNav } from "../_shared";
import { StaggerList, StaggerItem } from "../_HostelMotion";

export const metadata = {
  title: "Hostel Daily Follow Rules | Lakhisarai Physical Academy",
  description:
    "Daily follow rules for resident students at Lakhisarai Physical Academy hostel — discipline, training, timings, and conduct guidelines.",
};

const HOSTEL_RULES = [
  { id: 1, emoji: "⏰", rule: "समय पर उठना और सोना अनिवार्य।" },
  { id: 2, emoji: "🧹", rule: "अपने कमरे और आसपास की सफाई खुद रखें।" },
  { id: 3, emoji: "🏃", rule: "रोज़ निर्धारित समय पर Physical Training में शामिल हों।" },
  { id: 4, emoji: "🍛", rule: "समय पर खाना खाएँ और भोजन की बर्बादी न करें।" },
  { id: 5, emoji: "📱", rule: "बिना अनुमति के मोबाइल का गलत या अनावश्यक इस्तेमाल न करें।" },
  { id: 6, emoji: "🚫", rule: "हॉस्टल में लड़ाई-झगड़ा, गाली-गलौज और अनुशासनहीनता बिल्कुल नहीं।" },
  { id: 7, emoji: "👕", rule: "अपने कपड़े, जूते और व्यक्तिगत सामान व्यवस्थित रखें।" },
  { id: 8, emoji: "📚", rule: "पढ़ाई और तैयारी के लिए निर्धारित समय का पालन करें।" },
  { id: 9, emoji: "🛑", rule: "बिना अनुमति हॉस्टल से बाहर न जाएँ।" },
  { id: 10, emoji: "🤝", rule: "सभी साथियों, प्रशिक्षकों और स्टाफ का सम्मान करें।" },
  { id: 11, emoji: "💧", rule: "पानी और बिजली की बर्बादी न करें।" },
  { id: 12, emoji: "📢", rule: "किसी भी समस्या की जानकारी तुरंत हॉस्टल मैनेजमेंट वाले को दें।" },
];

function RulesHero() {
  return (
    <section id="top" className="pb-8 pt-16 sm:pt-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      <Container>
        <div className="mb-4">
          <HostelSubNav current="/hostel/rules" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#138808] border border-emerald-300 text-xs font-black mb-3">
          <ShieldCheck className="w-4 h-4 text-[#138808]" />
          <span>Academy Discipline Guidelines</span>
        </div>

        <h1 className="font-display mt-2 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px] text-slate-900">
          Daily Follow Rules <span className="text-[#ea580c]">(हॉस्टल नियम)</span>
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base font-medium max-w-2xl">
          🏠 हॉस्टल में रहने वाले बच्चों के लिए अनिवार्य अनुशासन नियम। सभी प्रशिक्षुओं से इन नियमों के कड़ाई से पालन की अपेक्षा की जाती है।
        </p>
      </Container>

    </section>
  );
}

function RulesGrid() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50/50">
      <Container>
        <StaggerList
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.05}
        >
          {HOSTEL_RULES.map((item) => (
            <StaggerItem
              key={item.id}
              className="bento-card bento-card-saffron p-5 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300 shadow-md"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-100/80 border border-orange-300/60 flex items-center justify-center text-xl shrink-0 shadow-sm">
                <span>{item.emoji}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white font-black text-[10px]">
                    Rule #{item.id}
                  </span>
                </div>
                <p className="font-body text-sm font-bold text-slate-900 leading-relaxed">
                  {item.rule}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function HostelRulesPage() {
  return (
    <>
      <RulesHero />
      <RulesGrid />
    </>
  );
}