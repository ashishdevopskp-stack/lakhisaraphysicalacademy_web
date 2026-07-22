// app/store/Store.tsx

import { ShoppingBag, Phone } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { telHref } from "@/app/lib/constants";
import { CATEGORY_GROUPS, OFFERS, DELIVERY_ROWS, type Product } from "../lib/store-data";
import { FadeInUp, ScrollFadeUp, StaggerList, StaggerItem } from "./_StoreMotion";
import FeaturedProducts from "./_FeaturedProducts";
import FAQSection from "./_FAQSection";

function StoreGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(20,184,166,0.16), transparent 70%)",
      }}
    />
  );
}

function StoreHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <StoreGlow />
      <Container>
        <FadeInUp className="max-w-[62ch]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-signal">
            Academy Store
          </p>

          <h1 className="font-display mt-5 max-w-[22ch] text-[32px] font-bold sm:text-[42px] lg:text-[50px]">
            Training Essentials &amp; Academy Store
          </h1>

          <p className="font-body mt-5 text-[15px] font-medium text-text">
            Quality products for physical training, fitness &amp; government
            exam preparation.
          </p>

          <p className="font-body mt-4 text-[15px] leading-relaxed text-text-muted">
            Explore our collection of training essentials, fitness
            accessories, sportswear, and study materials designed to support
            your physical preparation for Army, Bihar Police, Daroga, SSC GD,
            Railway, and other government recruitment examinations.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#products" variant="primary" icon={ShoppingBag}>
              Explore Products
            </Button>
            <Button href="#faq" variant="ghost" icon={Phone}>
              Contact Us
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}

function ProductCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="font-display text-[26px] font-bold sm:text-[32px]">
            Product Categories
          </h2>
        </ScrollFadeUp>

        <StaggerList
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.04}
        >
          {CATEGORY_GROUPS.map(({ label, icon: Icon, items }) => (
            <StaggerItem key={label} className="card-flat p-6">
              <div className="flex items-center gap-3">
                <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon size={17} className="text-signal-strong" />
                </span>
                <h3 className="font-display text-[15px] font-semibold text-text">{label}</h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function SpecialOffers() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp>
          <h2 className="font-display text-[28px] font-bold sm:text-[34px]">
            Special Offers
          </h2>
        </ScrollFadeUp>

        <StaggerList
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.06}
        >
          {OFFERS.map(({ label, description, icon: Icon }) => (
            <StaggerItem key={label} className="card-flat p-6">
              <Icon size={20} className="text-accent-strong" />
              <h3 className="font-display mt-4 text-[15px] font-semibold text-text">
                {label}
              </h3>
              <p className="font-body mt-1.5 text-[13px] text-text-muted">
                {description}
              </p>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function DeliveryInfo() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <ScrollFadeUp>
          <h2 className="font-display text-[26px] font-bold sm:text-[32px]">
            Delivery Information
          </h2>
        </ScrollFadeUp>

        <StaggerList className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3" staggerDelay={0.06}>
          {DELIVERY_ROWS.map(({ icon: Icon, label, detail }) => (
            <StaggerItem key={label} className="card-flat flex items-start gap-3 p-5">
              <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Icon size={16} className="text-signal-strong" />
              </span>
              <div>
                <p className="font-body text-[14px] font-medium text-text">{label}</p>
                <p className="font-body mt-1 text-[13px] text-text-muted">{detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Container>
    </section>
  );
}

function StoreCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <ScrollFadeUp className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-14">
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />
          <ShoppingBag size={26} className="mx-auto text-signal-strong" />
          <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
            Gear Up for Your Physical Test the Right Way
          </h2>
          <p className="font-body mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-text-muted">
            Order training essentials, study materials, and academy
            merchandise directly through the store or visit the academy in
            person.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={telHref()} variant="secondary" icon={Phone}>
              Call Now
            </Button>
            <Button href="#products" variant="ghost" icon={ShoppingBag}>
              Explore Products
            </Button>
          </div>
        </ScrollFadeUp>
      </Container>
    </section>
  );
}

export default function Store({
  products,
  productsError = false,
}: {
  products: Product[];
  productsError?: boolean;
}) {
  return (
    <>
      <StoreHero />
      <ProductCategories />
      <FeaturedProducts products={products} productsError={productsError} />
      <SpecialOffers />
      <DeliveryInfo />
      <FAQSection />
      <StoreCTA />
    </>
  );
}