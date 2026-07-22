// app/hostel/fees/page.tsx

import { Wallet, ClipboardList } from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import { HostelSubNav } from "../_shared";
import { StaggerList, StaggerItem, ScrollFadeUp } from "../_HostelMotion";

export const metadata = {
  title: "Hostel Fees | Lakhisarai Physical Academy",
  description:
    "Hostel fee structure at Lakhisarai Physical Academy — monthly accommodation, security deposit and food charges.",
};

/* Distinct from the shared SectionGlow — this page uses its own gradient values */
function FeesGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 1000px 600px at 50% 0%, rgba(34,197,94,0.09), transparent 60%), radial-gradient(ellipse 800px 500px at 100% 100%, rgba(37,99,235,0.08), transparent 55%)",
      }}
    />
  );
}

const FEE_PLANS = [
  { plan: "Monthly Hostel Fee", price: "₹3,500", note: "per month, shared room" },
  { plan: "Security Deposit", price: "₹2,000", note: "refundable, one-time" },
  { plan: "Food Charges", price: "₹2,500", note: "per month, mess included" },
];

function FeesHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-16 sm:pt-24">
      <FeesGlow />
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Hostel <span className="text-gradient-brand">Fees</span>
        </h1>
        <div className="mt-8">
          <HostelSubNav current="/hostel/fees" />
        </div>
      </Container>
    </section>
  );
}

function FeesGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <StaggerList className="grid grid-cols-1 gap-5 sm:grid-cols-3" staggerDelay={0.06}>
          {FEE_PLANS.map((fee) => (
            <StaggerItem key={fee.plan} className="card-flat p-6">
              <Wallet size={18} className="text-signal" />
              <p className="font-display mt-4 text-[14px] font-semibold text-text">
                {fee.plan}
              </p>
              <p className="font-display mt-1.5 text-[22px] font-bold text-text">
                {fee.price}
              </p>
              <p className="font-body mt-1 text-[12px] text-text-muted">{fee.note}</p>
            </StaggerItem>
          ))}
        </StaggerList>

        <ScrollFadeUp delay={0.2} className="mt-8">
          <Button href="/hostel#enquiry" variant="secondary" icon={ClipboardList}>
            View Fee Details
          </Button>
        </ScrollFadeUp>
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