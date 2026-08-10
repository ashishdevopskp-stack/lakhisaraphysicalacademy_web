// app/store/_FeaturedProducts.tsx
"use client";

import { useMemo, useState } from "react";
import { ShoppingBag, Search, Star, AlertCircle, CheckCircle2, ShoppingCart, Percent } from "lucide-react";
import OrderModal from "./OrderModal";
import Container from "../components/Container";
import { CATEGORY_GROUPS, type Product } from "../lib/store-data";
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
    <section id="products" className="py-14 sm:py-20 bg-slate-50/60">
      <Container>
        <ScrollFadeUp className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#ea580c]">
              Catalog Store
            </p>
            <h2 className="font-display mt-1 text-[28px] font-black text-slate-900 sm:text-[36px]">
              Explore Academy Store
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-sm w-fit">
            Showing {filtered.length} products
          </p>
        </ScrollFadeUp>

        {productsError && (
          <div className="mt-6 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
            <p className="font-body text-xs font-medium text-red-800">
              We couldn&apos;t load the live product catalog. Please refresh the page or contact academy support.
            </p>
          </div>
        )}

        {/* E-Commerce Search & Category Pills Filter */}
        <ScrollFadeUp delay={0.06} className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm w-full">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products (shoes, T-shirts, books, spikes...)"
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-extrabold text-slate-800 outline-none shadow-sm cursor-pointer w-full sm:w-auto"
            >
              {PRICE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoryOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-4 py-2 text-xs font-extrabold rounded-full transition-all whitespace-nowrap border ${
                  category === c
                    ? "bg-[#ea580c] text-white border-[#ea580c] shadow-md shadow-orange-500/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:text-[#ea580c]"
                }`}
              >
                {c === "All" ? "All Categories" : c}
              </button>
            ))}
          </div>
        </ScrollFadeUp>

        {/* Product Cards Grid */}
        <StaggerList
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.04}
        >
          {filtered.map((product, i) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            const discountPercent = hasDiscount
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : null;

            return (
              <StaggerItem key={product.name + i} className="bento-card flex flex-col p-5 shadow-sm hover:shadow-xl transition-all border border-slate-200 group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ShoppingBag size={42} className="text-slate-300" />
                  )}

                  {discountPercent && (
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-0.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white bg-red-600 rounded-full shadow-md">
                      <Percent size={10} /> {discountPercent}% OFF
                    </span>
                  )}

                  {product.offer && (
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ea580c] bg-amber-50 rounded-full border border-orange-200 shadow-sm">
                      {product.offer}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 rounded-md">
                    {product.category}
                  </span>
                  {product.rating && (
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-2.5 text-base font-extrabold text-slate-900 group-hover:text-[#ea580c] transition-colors leading-snug line-clamp-2">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-xl font-black text-slate-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-slate-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 size={13} />
                  <span>In Stock • Ready to Order</span>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setOrderingProduct(product)}
                    disabled={product.availability === "Out of Stock"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ea580c] px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#c2410c] disabled:opacity-50"
                  >
                    <ShoppingCart size={15} />
                    <span>Order Now</span>
                  </button>
                </div>
              </StaggerItem>
            );
          })}

          {filtered.length === 0 && !productsError && (
            <p className="font-body col-span-full py-12 text-center text-sm font-semibold text-slate-500">
              No store products match your current filters.
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