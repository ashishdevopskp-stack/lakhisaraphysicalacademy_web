// app/store/_FeaturedProducts.tsx
"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, Search, Star, AlertCircle } from "lucide-react";
import OrderModal from "./OrderModal";
import Container from "../components/Container";
import Badge from "../components/Badge";
import { CATEGORY_GROUPS, AVAILABILITY_STYLES, type Product } from "../lib/store-data";
import { ScrollFadeUp, StaggerList, StaggerItem } from "./_StoreMotion";

const PRODUCT_CATEGORY_LABELS = CATEGORY_GROUPS.map((c) => c.label);

const PRICE_OPTIONS = [
  { label: "All Prices", value: "All" },
  { label: "Under ₹300", value: "0-300" },
  { label: "₹300 – ₹800", value: "300-800" },
  { label: "Above ₹800", value: "800-99999" },
];

export default function FeaturedProducts({
  products,
  productsError = false,
}: {
  products: Product[];
  productsError?: boolean;
}) {
  const [category, setCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);

  const categoryOptions = useMemo(() => ["All", ...PRODUCT_CATEGORY_LABELS], []);

  const filtered = products.filter((p) => {
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
        <ScrollFadeUp>
          <h2 className="font-display text-[28px] font-bold sm:text-[34px]">
            Featured Products
          </h2>
        </ScrollFadeUp>

        {productsError && (
          <div className="mt-8 flex items-start gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-3">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-accent-strong" />
            <p className="font-body text-[13px] text-text-muted">
              We couldn&apos;t load the product catalog right now. Please refresh
              the page or check back shortly.
            </p>
          </div>
        )}

        <ScrollFadeUp
          delay={0.06}
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
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </ScrollFadeUp>

        <StaggerList
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.05}
        >
          {filtered.map((product, i) => {
            const status = AVAILABILITY_STYLES[product.availability];
            const StatusIcon = status.icon;
            return (
              <StaggerItem key={product.name + i} className="card-flat flex flex-col p-5">
                <div
                  className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-line"
                  style={{
                    background: product.imageUrl
                      ? undefined
                      : "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 75%)",
                  }}
                >
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ShoppingBag size={26} className="text-text-faint" />
                  )}
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

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setOrderingProduct(product)}
                    disabled={product.availability === "Out of Stock"}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ShoppingBag size={14} />
                    Order Now
                  </button>
                </div>
              </StaggerItem>
            );
          })}

          {filtered.length === 0 && !productsError && (
            <p className="font-body col-span-full text-[14px] text-text-muted">
              No products match these filters right now.
            </p>
          )}
        </StaggerList>
      </Container>

      {orderingProduct && (
        <OrderModal
          product={orderingProduct}
          onClose={() => setOrderingProduct(null)}
        />
      )}
    </section>
  );
}