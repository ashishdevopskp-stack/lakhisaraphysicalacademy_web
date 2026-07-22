// app/hostel/gallery/page.tsx

import { Building2 } from "lucide-react";
import Container from "../../components/Container";
import { HostelSubNav } from "../_shared";
import { StaggerList, StaggerItem } from "../_HostelMotion";

export const metadata = {
  title: "Hostel Gallery | Lakhisarai Physical Academy",
  description:
    "A look inside the hostel at Lakhisarai Physical Academy — rooms, beds, mess area, washrooms, study area and surroundings.",
};

const PILL_COLORS = ["pill-color-1", "pill-color-2", "pill-color-3", "pill-color-4", "pill-color-5"];

const GALLERY = [
  "Hostel Rooms",
  "Beds",
  "Mess Area",
  "Washrooms",
  "Study Area",
  "Outside View",
];

function GalleryHero() {
  return (
    <section id="top" className="pb-8 pt-16 sm:pt-24">
      <Container>
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.2em] text-signal">
          Hostel
        </p>
        <h1 className="font-display mt-5 max-w-[24ch] text-[30px] font-extrabold leading-[1.1] sm:text-[40px]">
          Hostel <span className="text-gradient-brand">Gallery</span>
        </h1>
        <div className="mt-8">
          <HostelSubNav current="/hostel/gallery" />
        </div>
      </Container>
    </section>
  );
}

function GalleryGrid() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <StaggerList
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          staggerDelay={0.05}
        >
          {GALLERY.map((item, i) => (
            <StaggerItem
              key={item}
              className={`card-flat flex aspect-square flex-col items-center justify-center gap-2 px-3 text-center ${PILL_COLORS[i % PILL_COLORS.length]}`}
            >
              <Building2 size={20} />
              <span className="font-body text-[12px] font-medium">{item}</span>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

export default function HostelGalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
    </>
  );
}