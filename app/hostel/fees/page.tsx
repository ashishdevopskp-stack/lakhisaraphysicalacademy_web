// app/hostel/fees/page.tsx

import { Wallet, ClipboardList } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { HostelSubNav } from "../_shared";
import { StaggerList, StaggerItem, ScrollFadeUp } from "../_HostelMotion";

export const metadata = {
  title: "Hostel Fees | Lakhisarai Physical Academy",
  description:
    "Monthly Hostel fee: ₹5,000/month (payable in one installment, non-refundable).",
};

const FEE_PLANS = [
  {
    plan: "Monthly Hostel Fee",
    price: "₹5,000 / month",
    note: "Payable in one installment, non-refundable",
  },
];

function FeesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-12 sm:pt-16">
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-3 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px] text-slate-900">
          Hostel <span className="text-[#ea580c]">Fees Structure</span>
        </h1>
        <div className="mt-6">
          <HostelSubNav current="/hostel/fees" />
        </div>
      </Container>
    </section>
  );
}

function FeesGrid() {
  return (
    <section className="py-10 sm:py-16">
      <Container>
        <div className="max-w-lg mx-auto">
          {FEE_PLANS.map((fee) => (
            <div
              key={fee.plan}
              className="bento-card bento-card-saffron p-8 text-center flex flex-col items-center justify-center shadow-lg"
            >
              <div className="p-3 bg-orange-50 text-[#ea580c] rounded-full border border-orange-200 mb-3">
                <Wallet size={24} />
              </div>

              <h3 className="font-display text-xl font-extrabold text-slate-900">
                {fee.plan}
              </h3>

              <p className="font-display mt-2 text-3xl sm:text-4xl font-black text-[#ea580c]">
                {fee.price}
              </p>

              <p className="font-body mt-3 text-sm font-semibold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                {fee.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/hostel#enquiry" variant="primary" icon={ClipboardList}>
            Apply for Hostel Admission
          </Button>
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