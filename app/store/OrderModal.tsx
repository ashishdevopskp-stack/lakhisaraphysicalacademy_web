// app/store/OrderModal.tsx
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Home,
  Building2,
  Map,
  Hash,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Plus,
  Minus,
  ArrowRight,
  PackageCheck,
} from "lucide-react";
import { createOrder } from "@/app/lib/action/orders";
import type { Product } from "../lib/store-data";

const MAX_QUANTITY = 20;

type FieldErrors = Partial<
  Record<
    "customerName" | "phone" | "street" | "city" | "district" | "pincode" | "quantity",
    string
  >
>;

function validateFields(formData: FormData): FieldErrors {
  const errors: FieldErrors = {};

  const customerName = String(formData.get("customerName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const street = String(formData.get("street") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const district = String(formData.get("district") || "").trim();
  const pincode = String(formData.get("pincode") || "").trim();
  const quantityRaw = String(formData.get("quantity") || "").trim();

  if (!customerName) errors.customerName = "Enter your full name.";
  if (!/^[0-9]{10}$/.test(phone)) errors.phone = "Enter a valid 10-digit phone number.";
  if (!street) errors.street = "Enter your house/street/locality.";
  if (!city) errors.city = "Enter your village or city.";
  if (!district) errors.district = "Enter your district.";
  if (!/^[0-9]{6}$/.test(pincode)) errors.pincode = "Enter a valid 6-digit pincode.";

  const quantity = Number(quantityRaw);
  if (!quantityRaw || Number.isNaN(quantity) || !Number.isInteger(quantity) || quantity < 1) {
    errors.quantity = "Enter a valid quantity.";
  } else if (quantity > MAX_QUANTITY) {
    errors.quantity = `Max ${MAX_QUANTITY} per order — contact us for bulk orders.`;
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-red-600">
      <AlertCircle size={13} className="shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export default function OrderModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Lock body scroll while the modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Autofocus the first field on mount
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  // Escape to close + basic focus trap
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !isPending) {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPending, onClose]);

  function handleSubmit(formData: FormData) {
    setError(null);

    // Make sure current quantity state is included in formData if needed
    formData.set("quantity", String(quantity));

    const errors = validateFields(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstInvalid = Object.keys(errors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    startTransition(async () => {
      try {
        const result = await createOrder(formData);
        if (result.success) {
          setSuccess(true);
          setTimeout(onClose, 2500);
        } else {
          setError(result.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        setError(
          "Couldn't reach the server. Please check your connection and try again."
        );
      }
    });
  }

  function handleBackdropClick() {
    if (!isPending) onClose();
  }

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const subtotal = product.price * quantity;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl shadow-slate-950/25 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        {/* Top Tiranga Brand Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff9933] via-[#000080] to-[#138808]" />

        {/* Modal Header Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-4 sm:p-5 text-white shrink-0 overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-orange-500/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              {product.imageUrl ? (
                <div className="h-14 w-14 shrink-0 rounded-2xl overflow-hidden bg-slate-800 border border-white/15 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <ShoppingBag size={26} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                    Order Request
                  </span>
                  {product.category && (
                    <span className="text-[11px] font-bold text-slate-400 truncate">
                      • {product.category}
                    </span>
                  )}
                </div>
                <h3
                  id="order-modal-title"
                  className="font-display mt-0.5 text-base sm:text-lg font-bold text-white leading-tight truncate"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-base font-extrabold text-orange-400">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs font-semibold text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="shrink-0 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-white">
          {success ? (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
              <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-xl shadow-emerald-500/10 border border-emerald-200">
                <CheckCircle2 size={44} className="animate-in zoom-in duration-300" />
                <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-25" />
              </div>
              <h4 className="font-display text-xl font-black text-slate-900">
                Order Submitted Successfully!
              </h4>
              <p className="font-body mt-2 text-sm text-slate-600 max-w-xs leading-relaxed">
                Thank you! Our academy team will call you shortly on your phone to confirm your delivery details.
              </p>
              <div className="mt-5 w-full max-w-xs rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-left text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Product:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[170px]">
                    {product.name}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Total Amount:</span>
                  <span className="font-bold text-orange-600">
                    ₹{subtotal.toLocaleString("en-IN")} ({quantity} qty)
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                    Pending Confirmation
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 flex items-center justify-center gap-2 w-full max-w-xs rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-md"
              >
                <span>Close Window</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form action={handleSubmit} noValidate className="space-y-4">
              <input type="hidden" name="productName" value={product.name} />

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-xs text-red-800"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
                  <div className="font-medium leading-relaxed">{error}</div>
                </div>
              )}

              {/* Personal Info Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  <User size={14} className="text-[#ea580c]" />
                  <span>Customer Details</span>
                </div>

                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-1 block text-xs font-bold text-slate-700"
                  >
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      ref={firstFieldRef}
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      disabled={isPending}
                      onChange={() => clearFieldError("customerName")}
                      aria-invalid={Boolean(fieldErrors.customerName)}
                      aria-describedby={
                        fieldErrors.customerName ? "customerName-error" : undefined
                      }
                      className={`w-full rounded-xl border bg-slate-50/80 pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60 ${
                        fieldErrors.customerName
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200"
                      }`}
                      placeholder="e.g. Rahul Kumar"
                    />
                  </div>
                  {fieldErrors.customerName && (
                    <span id="customerName-error">
                      <FieldError message={fieldErrors.customerName} />
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-xs font-bold text-slate-700"
                  >
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      disabled={isPending}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      onChange={() => clearFieldError("phone")}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      className={`w-full rounded-xl border bg-slate-50/80 pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60 ${
                        fieldErrors.phone
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200"
                      }`}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <span id="phone-error">
                      <FieldError message={fieldErrors.phone} />
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  <MapPin size={14} className="text-[#ea580c]" />
                  <span>Delivery Address</span>
                </div>

                <div>
                  <label
                    htmlFor="street"
                    className="mb-1 block text-xs font-bold text-slate-700"
                  >
                    House No. / Street / Locality <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Home
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="street"
                      name="street"
                      type="text"
                      required
                      disabled={isPending}
                      onChange={() => clearFieldError("street")}
                      aria-invalid={Boolean(fieldErrors.street)}
                      aria-describedby={fieldErrors.street ? "street-error" : undefined}
                      className={`w-full rounded-xl border bg-slate-50/80 pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60 ${
                        fieldErrors.street
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200"
                      }`}
                      placeholder="e.g. Ward No. 4, Station Road"
                    />
                  </div>
                  {fieldErrors.street && (
                    <span id="street-error">
                      <FieldError message={fieldErrors.street} />
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1 block text-xs font-bold text-slate-700"
                    >
                      Village / City <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        disabled={isPending}
                        onChange={() => clearFieldError("city")}
                        aria-invalid={Boolean(fieldErrors.city)}
                        aria-describedby={fieldErrors.city ? "city-error" : undefined}
                        className={`w-full rounded-xl border bg-slate-50/80 pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60 ${
                          fieldErrors.city
                            ? "border-red-400 bg-red-50/30"
                            : "border-slate-200"
                        }`}
                        placeholder="e.g. Lakhisarai"
                      />
                    </div>
                    {fieldErrors.city && (
                      <span id="city-error">
                        <FieldError message={fieldErrors.city} />
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="district"
                      className="mb-1 block text-xs font-bold text-slate-700"
                    >
                      District <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Map
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                      <input
                        id="district"
                        name="district"
                        type="text"
                        required
                        disabled={isPending}
                        onChange={() => clearFieldError("district")}
                        aria-invalid={Boolean(fieldErrors.district)}
                        aria-describedby={fieldErrors.district ? "district-error" : undefined}
                        className={`w-full rounded-xl border bg-slate-50/80 pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60 ${
                          fieldErrors.district
                            ? "border-red-400 bg-red-50/30"
                            : "border-slate-200"
                        }`}
                        placeholder="e.g. Lakhisarai"
                      />
                    </div>
                    {fieldErrors.district && (
                      <span id="district-error">
                        <FieldError message={fieldErrors.district} />
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="mb-1 block text-xs font-bold text-slate-700"
                  >
                    Pincode <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      required
                      disabled={isPending}
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      onChange={() => clearFieldError("pincode")}
                      aria-invalid={Boolean(fieldErrors.pincode)}
                      aria-describedby={fieldErrors.pincode ? "pincode-error" : undefined}
                      className={`w-full rounded-xl border bg-slate-50/80 pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60 ${
                        fieldErrors.pincode
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200"
                      }`}
                      placeholder="e.g. 811311"
                    />
                  </div>
                  {fieldErrors.pincode && (
                    <span id="pincode-error">
                      <FieldError message={fieldErrors.pincode} />
                    </span>
                  )}
                </div>
              </div>

              {/* Product Options & Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-1 block text-xs font-bold text-slate-700"
                  >
                    Quantity
                  </label>
                  <input type="hidden" name="quantity" value={quantity} />
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        clearFieldError("quantity");
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      disabled={isPending || quantity <= 1}
                      className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 disabled:opacity-40 font-bold transition-all shadow-sm"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center font-display text-sm font-extrabold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        clearFieldError("quantity");
                        setQuantity(Math.min(MAX_QUANTITY, quantity + 1));
                      }}
                      disabled={isPending || quantity >= MAX_QUANTITY}
                      className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 disabled:opacity-40 font-bold transition-all shadow-sm"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {fieldErrors.quantity && (
                    <span id="quantity-error">
                      <FieldError message={fieldErrors.quantity} />
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="mb-1 block text-xs font-bold text-slate-700"
                  >
                    Size / Color <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Sparkles
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="notes"
                      name="notes"
                      type="text"
                      disabled={isPending}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#ea580c] focus:ring-4 focus:ring-orange-500/10 disabled:opacity-60"
                      placeholder="e.g. Size L, Blue"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-50/80 via-amber-50/40 to-slate-50 p-4 border border-orange-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Item Subtotal ({quantity} item{quantity > 1 ? "s" : ""})</span>
                  <span className="font-bold text-slate-800">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck size={14} /> Direct Cash / Pay on Delivery
                  </span>
                  <span className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                </div>
                <div className="pt-2 border-t border-orange-200/80 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Total Order Amount</span>
                  <span className="font-display text-lg font-black text-[#ea580c]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isPending}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ea580c] via-orange-500 to-[#f97316] py-3.5 px-6 text-sm font-black text-white shadow-xl shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-white" />
                      <span>Placing Your Order...</span>
                    </>
                  ) : (
                    <>
                      <PackageCheck size={18} className="transition-transform group-hover:scale-110" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}