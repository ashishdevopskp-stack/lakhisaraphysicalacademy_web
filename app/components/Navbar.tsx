import { Phone, PhoneCall } from "lucide-react";
import Container from "./Container";
import Button from "./Button";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Vacancies", href: "#vacancies" },
  { label: "Results", href: "#results" },
  { label: "Hostel", href: "#hostel" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-6 sm:h-[84px]">
          <a href="#top" className="flex flex-shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-signal font-display text-[15px] font-bold tracking-wide text-on-signal">
              LPA
            </span>
            <span className="hidden font-display text-[13px] font-semibold uppercase leading-tight tracking-wide text-text lg:inline-block">
              Lakhisarai
              <br />
              Physical Academy
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-sm font-medium text-text-muted lg:flex"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-150 hover:text-signal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Button href="tel:8863081082" variant="ghost" icon={PhoneCall}>
              <span className="hidden sm:inline">Call Now</span>

            </Button>
            <Button href="#admission" variant="primary">
              Apply Online
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}