// app/store/OrderModal.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createOrder } from "@/app/lib/action/orders";
import type { Product } from "../lib/store-data";

export default function OrderModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !isPending) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPending, onClose]);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await createOrder(formData);
        if (result.success) {
          setSuccess(true);
          setTimeout(onClose, 1800);
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="glass max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wide text-text-faint">
              Order Request
            </p>
            <h3
              id="order-modal-title"
              className="font-display mt-1 text-[18px] font-semibold text-text"
            >
              {product.name}
            </h3>
            <p className="font-body text-[13px] text-text-muted">₹{product.price}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="shrink-0 rounded-lg p-1 text-text-faint transition-colors hover:bg-white/5 hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
            <span className="glass flex h-12 w-12 items-center justify-center rounded-full">
              <CheckCircle2 size={24} className="text-signal-strong" />
            </span>
            <p className="font-body mt-1 text-[14px] font-medium text-text">
              Order received!
            </p>
            <p className="font-body text-[13px] text-text-muted">
              We&apos;ll contact you shortly to confirm.
            </p>
          </div>
        ) : (
          <form action={handleSubmit} className="mt-6 space-y-4">
            <input type="hidden" name="productName" value={product.name} />

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-line bg-white/[0.03] px-3.5 py-2.5"
              >
                <AlertCircle size={15} className="mt-0.5 shrink-0 text-accent-strong" />
                <p className="font-body text-[13px] text-text-muted">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="customerName" className="mb-1.5 block text-[13px] font-medium text-text">
                Full Name
              </label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                required
                disabled={isPending}
                className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-[13px] font-medium text-text">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                disabled={isPending}
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                placeholder="10-digit mobile number"
              />
            </div>

            <div className="border-t border-line pt-4">
              <p className="font-mono mb-3 text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                Delivery Address
              </p>

              <div className="space-y-3">
                <div>
                  <label htmlFor="street" className="mb-1.5 block text-[13px] font-medium text-text">
                    House No. / Street / Locality
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    disabled={isPending}
                    className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                    placeholder="e.g. Ward No. 4, Station Road"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="city" className="mb-1.5 block text-[13px] font-medium text-text">
                      Village / City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      disabled={isPending}
                      className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                      placeholder="e.g. Lakhisarai"
                    />
                  </div>
                  <div>
                    <label htmlFor="district" className="mb-1.5 block text-[13px] font-medium text-text">
                      District
                    </label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      required
                      disabled={isPending}
                      className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                      placeholder="e.g. Lakhisarai"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pincode" className="mb-1.5 block text-[13px] font-medium text-text">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    required
                    disabled={isPending}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                    placeholder="e.g. 811311"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-line pt-4">
              <div>
                <label htmlFor="quantity" className="mb-1.5 block text-[13px] font-medium text-text">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  disabled={isPending}
                  className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="notes" className="mb-1.5 block text-[13px] font-medium text-text">
                  Size/Color <span className="text-text-faint">(optional)</span>
                </label>
                <input
                  id="notes"
                  name="notes"
                  type="text"
                  disabled={isPending}
                  className="w-full rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60"
                  placeholder="e.g. L, Blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Placing Order..." : "Confirm Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}