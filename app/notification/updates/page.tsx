// app/notification/updates/page.tsx

import Container from "../../components/Container";
import NotificationListings from "./_NotificationListings";

export const metadata = {
  title: "All Notifications | Lakhisarai Physical Academy",
  description:
    "Browse and filter all academy notifications — admissions, job alerts, exam updates, results, events, hostel and holiday notices.",
};

function UpdatesHero() {
  return (
    <section id="top" className="pb-8 pt-14 sm:pt-20">
      <Container>
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
          Announcements
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[28px] font-bold sm:text-[38px]">
          All <span className="text-gradient-brand">Notifications</span>
        </h1>
        <div className="mt-8">
          {/* was "/notifications/updates" (plural) — corrected to match NOTIFICATIONS_NAV */}
       
        </div>
      </Container>
    </section>
  );
}

export default function NotificationUpdatesPage() {
  return (
    <>
      <UpdatesHero />
      <NotificationListings />
    </>
  );
}