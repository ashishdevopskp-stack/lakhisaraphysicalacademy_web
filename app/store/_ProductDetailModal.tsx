"use client";

import { useState } from "react";
import {
  X,
  ShoppingBag,
  Star,
  CheckCircle2,
  ShoppingCart,
  Percent,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { Product } from "@/app/lib/store-data";

export default function ProductDetailModal({
  product,
  onClose,
  onOrderNow,
}: {
  product: Product;
  onClose: () => void;
  onOrderNow: () => void;
}) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : null;

  const pointsList = product.description
    ? product.description.split("\n").filter(Boolean)
    : [
        "Tested & Recommended by Ganesh Sir & NIS Physical Coaches",
        "Durable, long-lasting quality built for intense daily academy training",
        "Official Lakhisarai Physical Academy store item",
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-5 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Left Column: Image Container */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ShoppingBag size={64} className="text-slate-300" />
            )}

            {discountPercent && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 text-xs font-black uppercase tracking-wider text-white bg-red-600 rounded-full shadow-lg">
                <Percent size={12} /> {discountPercent}% OFF
              </span>
            )}

            {product.offer && (
              <span className="absolute top-3 right-3 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#ea580c] bg-amber-50 rounded-full border border-orange-200 shadow-md">
                {product.offer}
              </span>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-700 bg-slate-100 rounded-full border border-slate-200">
                {product.category}
              </span>

              {product.rating && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-black text-slate-800">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating} / 5</span>
                </div>
              )}
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {product.name}
            </h2>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 bg-orange-50/60 p-3.5 rounded-2xl border border-orange-200/80">
              <span className="font-display text-2xl sm:text-3xl font-black text-slate-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-bold text-slate-400 line-through">
                  MRP ₹{product.originalPrice}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 w-fit">
              <CheckCircle2 size={15} />
              <span>In Stock • Ready to Order</span>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <ShieldCheck size={16} className="text-[#ea580c] shrink-0" />
                <span>Coach Verified Quality</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <Truck size={16} className="text-emerald-600 shrink-0" />
                <span>Fast Local Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Features & Description Points */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-800">
            <Sparkles size={15} className="text-[#ea580c]" />
            <span>Product Highlights &amp; Specifications</span>
          </div>

          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <ul className="space-y-2.5">
              {pointsList.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800 leading-relaxed">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point.replace(/^[•\-\*]\s*/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOrderNow();
            }}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] px-6 py-3.5 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <ShoppingCart size={16} />
            <span>Order Now (₹{product.price})</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
