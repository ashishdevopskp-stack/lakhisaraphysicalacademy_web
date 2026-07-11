"use client";

import Container from "./Container";
import Button from "./Button";
import { brand, nav, contact } from "../lib/site-data";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="ios-blur sticky top-0 z-50 border-b border-line">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <a
            href="#top"
            className="text-[17px] font-semibold tracking-tight text-text"
          >
            {brand.shortName}
          </a>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
           
            <div className="hidden sm:block">
              <Button href={contact.phoneHref} variant="secondary" icon={Phone}>
                Call
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}