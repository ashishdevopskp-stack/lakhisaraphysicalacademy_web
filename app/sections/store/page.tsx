"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  MessageCircle,
  Phone,
  Search,
  Star,
  Shirt,
  Footprints,
  Dumbbell,
  Droplets,
  BookOpen,
  Gift,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Timer,
  ChevronDown,
  Truck,
  Store as StoreIcon,
  Sparkles,
  Flame,
  Crown,
  ArrowRight,
} from "lucide-react";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE },
};

const WHATSAPP_NUMBER = "918863081082";

function whatsappOrderLink(productName: string) {
  const message = `Hello Lakhisarai Physical Academy, I would like to order the following product:\nProduct Name: ${productName}\nQuantity: \nColor/Size (if applicable): \nPlease share the availability and payment details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* =========================================================
   1. Hero
   ========================================================= */
function StoreHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(20,184,166,0.16), transparent 70%)",
        }}
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[62ch]"
        >
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
            <Button
              href={whatsappOrderLink("")}
              variant="whatsapp"
              icon={MessageCircle}
            >
              Order on WhatsApp
            </Button>
            <Button href="#faq" variant="ghost" icon={Phone}>
              Contact Us
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   2. Product Categories
   ========================================================= */
interface CategoryGroup {
  label: string;
  icon: typeof Shirt;
  items: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    label: "Sports Wear",
    icon: Shirt,
    items: ["Sports T-Shirts", "Track Suits", "Shorts", "Lowers", "Jackets", "Caps"],
  },
  {
    label: "Footwear",
    icon: Footprints,
    items: ["Running Shoes", "Training Shoes", "Sports Socks"],
  },
  {
    label: "Fitness Equipment",
    icon: Dumbbell,
    items: [
      "Skipping Rope",
      "Resistance Bands",
      "Hand Gripper",
      "Push-Up Bar",
      "Exercise Mat",
      "Cones & Markers",
      "Stopwatch",
    ],
  },
  {
    label: "Accessories",
    icon: Droplets,
    items: [
      "Water Bottle",
      "Gym Bag / Backpack",
      "Towel",
      "Shaker Bottle",
      "Knee Support",
      "Elbow Support",
      "Wrist Band",
    ],
  },
  {
    label: "Study Materials",
    icon: BookOpen,
    items: [
      "Physical Test Guide Books",
      "Practice Notes",
      "Current Affairs Booklets",
      "Previous Year Papers",
      "Academy Study Materials",
    ],
  },
  {
    label: "Academy Merchandise",
    icon: Gift,
    items: [
      "Academy T-Shirts",
      "Academy Track Suits",
      "Academy Cap",
      "Academy Bag",
      "Academy Bottle",
    ],
  },
];

function ProductCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
          Product Categories
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_GROUPS.map(({ label, icon: Icon, items }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 6) * 0.04 }}
              className="card-flat p-6"
            >
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
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   3. Featured Products — sample data, wire to your CMS/API
   ========================================================= */
type Availability = "In Stock" | "Limited Stock" | "Out of Stock" | "Pre-Order";

interface Product {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  availability: Availability;
  offer?: string;
}

const PRODUCT_CATEGORY_LABELS = CATEGORY_GROUPS.map((c) => c.label);

const PRODUCTS: Product[] = [
  {
    name: "Academy Track Suit",
    category: "Academy Merchandise",
    price: 899,
    originalPrice: 1199,
    rating: 4.6,
    availability: "In Stock",
    offer: "Academy Exclusive",
  },
  {
    name: "Running Shoes – ProGrip",
    category: "Footwear",
    price: 1499,
    originalPrice: 1899,
    rating: 4.4,
    availability: "In Stock",
    offer: "Best Seller",
  },
  {
    name: "Resistance Bands Set",
    category: "Fitness Equipment",
    price: 349,
    rating: 4.2,
    availability: "In Stock",
  },
  {
    name: "Physical Test Guide Book",
    category: "Study Materials",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    availability: "Limited Stock",
    offer: "New Arrival",
  },
  {
    name: "Gym Bag / Backpack",
    category: "Accessories",
    price: 599,
    rating: 4.3,
    availability: "In Stock",
  },
  {
    name: "Sports T-Shirt (Dry-Fit)",
    category: "Sports Wear",
    price: 349,
    originalPrice: 449,
    rating: 4.1,
    availability: "In Stock",
  },
  {
    name: "Stopwatch – Digital",
    category: "Fitness Equipment",
    price: 449,
    availability: "Pre-Order",
  },
  {
    name: "Academy Water Bottle",
    category: "Academy Merchandise",
    price: 199,
    availability: "Out of Stock",
  },
];

const AVAILABILITY_STYLES: Record<
  Availability,
  { className: string; icon: typeof CheckCircle2 }
> = {
  "In Stock": { className: "text-olive-strong", icon: CheckCircle2 },
  "Limited Stock": { className: "text-accent-strong", icon: AlertTriangle },
  "Out of Stock": { className: "text-text-faint", icon: XCircle },
  "Pre-Order": { className: "text-text-faint", icon: Timer },
};

function FeaturedProducts() {
  const [category, setCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categoryOptions = useMemo(
    () => ["All", ...PRODUCT_CATEGORY_LABELS],
    []
  );
  const priceOptions = [
    { label: "All Prices", value: "All" },
    { label: "Under ₹300", value: "0-300" },
    { label: "₹300 – ₹800", value: "300-800" },
    { label: "Above ₹800", value: "800-99999" },
  ];

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesQuery =
      query.trim() === "" || p.name.toLowerCase().includes(query.toLowerCase());
    let matchesPrice = true;
    if (priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = p.price >= min && p.price <= max;
    }
    return matchesCategory && matchesQuery && matchesPrice;
  });

  return (
    <section id="products" className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Featured Products
        </motion.h2>

        {/* Search & Filter */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="glass flex flex-1 items-center gap-2 rounded-lg px-4 py-2.5">
            <Search size={16} className="shrink-0 text-text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent text-[14px] text-text outline-none placeholder:text-text-faint"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="glass rounded-lg px-4 py-2.5 text-[14px] text-text outline-none"
          >
            {priceOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product, i) => {
            const status = AVAILABILITY_STYLES[product.availability];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={product.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 4) * 0.05 }}
                className="card-flat flex flex-col p-5"
              >
                <div
                  className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-line"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 75%)",
                  }}
                >
                  <ShoppingBag size={26} className="text-text-faint" />
                  {product.offer && (
                    <span className="glass absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-signal-strong">
                      {product.offer}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <Badge>{product.category}</Badge>
                  {product.rating && (
                    <span className="flex items-center gap-1 text-[12px] text-text-muted">
                      <Star size={12} className="fill-accent-strong text-accent-strong" />
                      {product.rating}
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-3 text-[15px] font-semibold text-text">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[16px] font-semibold text-text">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[13px] text-text-faint line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <span
                  className={`mt-2 flex items-center gap-1.5 text-[12px] font-medium ${status.className}`}
                >
                  <StatusIcon size={13} />
                  {product.availability}
                </span>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button href="#" variant="primary" icon={ArrowRight}>
                    View Details
                  </Button>
                  <Button
                    href={whatsappOrderLink(product.name)}
                    variant="whatsapp"
                    icon={MessageCircle}
                  >
                    Order on WhatsApp
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No products match these filters right now.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   4. Special Offers
   ========================================================= */
const OFFERS = [
  {
    label: "New Arrivals",
    description: "Freshly stocked training gear",
    icon: Sparkles,
  },
  {
    label: "Best Sellers",
    description: "Most ordered by academy students",
    icon: Flame,
  },
  {
    label: "Seasonal Offers",
    description: "Limited-time discounted bundles",
    icon: Timer,
  },
  {
    label: "Academy Exclusive",
    description: "Official Lakhisarai Academy merchandise",
    icon: Crown,
  },
];

function SpecialOffers() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Special Offers
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map(({ label, description, icon: Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat p-6"
            >
              <Icon size={20} className="text-accent-strong" />
              <h3 className="font-display mt-4 text-[15px] font-semibold text-text">
                {label}
              </h3>
              <p className="font-body mt-1.5 text-[13px] text-text-muted">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   5. Delivery & Pickup
   ========================================================= */
function DeliveryInfo() {
  const rows = [
    { icon: Truck, label: "Delivery Available", detail: "Shipped across Bihar and select pin codes" },
    { icon: StoreIcon, label: "Pickup from Academy", detail: "Collect directly from the academy campus" },
    { icon: Timer, label: "Estimated Delivery Time", detail: "3–7 working days after order confirmation" },
  ];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[26px] font-bold sm:text-[32px]">
          Delivery Information
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rows.map(({ icon: Icon, label, detail }, i) => (
            <motion.div
              key={label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card-flat flex items-start gap-3 p-5"
            >
              <span className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Icon size={16} className="text-signal-strong" />
              </span>
              <div>
                <p className="font-body text-[14px] font-medium text-text">{label}</p>
                <p className="font-body mt-1 text-[13px] text-text-muted">{detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   6. FAQ
   ========================================================= */
const FAQS = [
  {
    q: "How can I order a product?",
    a: "Tap Order on WhatsApp on any product card, and a pre-filled message with the product name will open in WhatsApp. Confirm quantity, size, or color and our team will guide you through payment and delivery.",
  },
  {
    q: "Is home delivery available?",
    a: "Yes, delivery is available across Bihar and select pin codes. Estimated delivery time is 3–7 working days after order confirmation.",
  },
  {
    q: "Can I buy products directly from the academy?",
    a: "Yes, you can visit the academy in person and pick up available products directly from our campus store.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, cash on pickup, and other payment methods shared by our team once your order is confirmed on WhatsApp.",
  },
  {
    q: "Is product exchange available?",
    a: "Size or defect-related exchanges are available for select items. Please reach out to us on WhatsApp within 3 days of delivery.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container>
        <motion.h2 {...fadeUp} className="font-display text-[28px] font-bold sm:text-[34px]">
          Frequently Asked Questions
        </motion.h2>

        <div className="glass mt-8 flex max-w-[70ch] flex-col divide-y divide-line overflow-hidden rounded-2xl">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-[15px] font-medium text-text">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-text-faint transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="font-body px-5 pb-5 text-[14px] leading-relaxed text-text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   7. Store CTA
   ========================================================= */
function StoreCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.div
          {...fadeUp}
          className="glass glass-sheen sheen-run relative overflow-hidden rounded-2xl px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-14"
        >
          <span className="ribbon-bar absolute inset-x-0 top-0 h-[4px]" aria-hidden />
          <ShoppingBag size={26} className="mx-auto text-signal-strong" />
          <h2 className="font-display mx-auto mt-4 max-w-[28ch] text-[28px] font-bold sm:text-[36px]">
            Gear Up for Your Physical Test the Right Way
          </h2>
          <p className="font-body mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-text-muted">
            Order training essentials, study materials, and academy
            merchandise directly on WhatsApp or visit the academy in person.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={whatsappOrderLink("")}
              variant="whatsapp"
              icon={MessageCircle}
            >
              Order on WhatsApp
            </Button>
            <Button href="tel:8863081082" variant="secondary" icon={Phone}>
              Call Now
            </Button>
            <Button href="#products" variant="ghost" icon={ShoppingBag}>
              Explore Products
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   Page content export
   ========================================================= */
export default function Store() {
  return (
    <>
      <StoreHero />
      <ProductCategories />
      <FeaturedProducts />
      <SpecialOffers />
      <DeliveryInfo />
      <FAQ />
      <StoreCTA />
    </>
  );
}