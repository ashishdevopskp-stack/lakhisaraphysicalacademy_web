"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { FAQSchema } from "./JsonLd";

export interface FAQItem {
  question: string;
  answer: string;
  category: "Admission" | "Physical Training" | "Hostel" | "Courses & Fees";
}

const FAQS: FAQItem[] = [
  {
    question: "लखीसराय फिजिकल एकेडमी में एडमिशन कैसे लें? (How to get admission?)",
    answer: "आप हमारी वेबसाइट पर 'Online Admission Form' भर सकते हैं या लखीसराय एकेडमी में प्रत्यक्ष रूप से विजिट करके अपना रजिस्ट्रेशन पूरा कर सकते हैं। डॉक्यूमेंट्स में 10th/12th मार्कशीट, आधार कार्ड और पासपोर्ट साइज फोटो आवश्यक हैं।",
    category: "Admission",
  },
  {
    question: "फिजिकल ट्रेनिंग का समय क्या है? (What are the physical training timings?)",
    answer: "मॉर्निंग बैच का समय सुबह 5:00 AM से 7:30 AM तक है (K.R.K Field, Lakhisarai)। इवनिंग बैच शाम 4:30 PM से 6:30 PM तक चलता है। रविवार को स्पेशल टाइम ट्रायल और मेडिकल टेस्ट कराया जाता है।",

    category: "Physical Training",
  },
  {
    question: "बिहार पुलिस कांस्टेबल और दरोगा SI के लिए क्या स्पेशल बैच उपलब्ध हैं?",
    answer: "हाँ, हमारे यहाँ बिहार पुलिस कांस्टेबल, SI (दरोगा), SSC GD, RPF, एवं आर्मी अग्निवीर के लिए विशेष 1600m रनिंग, हाई जंप (Tiger Jump & Scissor Jump), लॉन्ग जंप और गोला फेंक की समर्पित ट्रेनिंग दी जाती है।",
    category: "Courses & Fees",
  },
  {
    question: "क्या बाहरी छात्रों के लिए हॉस्टल एवं मेस की सुविधा उपलब्ध है?",
    answer: "हाँ। लखीसराय फिजिकल अकैडमी में बाहर से आने वाले छात्रों के लिए हॉस्टल एवं मेस की सुविधा उपलब्ध है। जिसमे तीन दिन वेज तीन दिन नॉन वेज की व्यवस्था है",
    category: "Hostel",
  },

  {
    question: "शारीरिक प्रशिक्षण के साथ लिखित परीक्षा (Written Exam) की तैयारी भी होती है?",
    answer: "बिल्कुल! सुबह फिजिकल ट्रेनिंग के बाद दोपहर एवं शाम को स्पेशल लिखित परीक्षा बैचेज चलाए जाते हैं जिनमें बिहार स्पेशल GK, मैथ्स, रीजनिंग और डेली टेस्ट सीरीज़ कराई जाती है।",
    category: "Courses & Fees",
  },
  {
    question: "एडमिशन एवं अधिक जानकारी के लिए किस नंबर पर संपर्क करें?",
    answer: "📞 7739776471 / 7903594008 — अधिक जानकारी, Batch, Hostel, Mess और Admission से संबंधित जानकारी के लिए संपर्क करें।",
    category: "Admission",
  },
  {
    question: "क्या कमजोर Running वाले छात्र भी एडमिशन ले सकते हैं?",
    answer: "बिल्कुल। शुरुआती स्तर से Training देकर धीरे-धीरे Speed, Stamina और Running Performance को बेहतर करने पर काम किया जाता है।",
    category: "Physical Training",
  },
  {
    question: "Lakhisarai Physical Academy में किन भर्तियों की तैयारी कराई जाती है?",
    answer: "बिहार पुलिस, दरोगा, दिल्ली पुलिस, होमगार्ड, आर्मी, SSC-GD, CRPF, चौकीदार एवं अन्य पुलिस/डिफेंस भर्ती की फिजिकल तैयारी कराई जाती है।",
    category: "Courses & Fees",
  },
  {
    question: "Coach Ganesh Sir की विशेषता क्या है?",
    answer: `Coach Ganesh Sir का मुख्य फोकस छात्रों की Physical Fitness, Running Performance और भर्ती के Physical Events की सही तकनीक पर रहता है। वे छात्रों को उनके स्तर के अनुसार Training, नियमित Practice और Physical Test के माध्यम से बेहतर तैयारी करने के लिए मार्गदर्शन देते हैं।

मुख्य विशेषताएँ:
• 🏃 Running एवं Speed Training
• 🦘 High Jump & Long Jump Technique
• 💪 Strength एवं Stamina Training
• 🎯 भर्ती के Physical Test के अनुसार Practice
• 📊 नियमित Performance Test एवं सुधार पर ध्यान
• 👥 नए और अनुभवी दोनों छात्रों को Guidance
• 🔥 अनुशासन और नियमित Training पर विशेष जोर`,
    category: "Physical Training",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-bg">
      <FAQSchema faqs={FAQS.map((f) => ({ question: f.question, answer: f.answer }))} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-signal mb-3">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold py-2 leading-snug">
            अक्सर पूछे जाने वाले सवाल (FAQ)
          </h2>
          <p className="mt-3 text-text-muted text-base max-w-2xl mx-auto">
            बिहार पुलिस, आर्मी, SSC GD एवं फिजिकल ट्रेनिंग से संबंधित अपने सभी सवालों का स्पष्ट उत्तर यहाँ पाएँ।
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-line bg-bg-raised overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 px-5 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base text-text flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-signal shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t border-line pt-3 whitespace-pre-line">
                    <p>{faq.answer}</p>
                    <div className="mt-3 inline-block px-2.5 py-0.5 bg-bg text-text-faint text-xs rounded border border-line">
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
