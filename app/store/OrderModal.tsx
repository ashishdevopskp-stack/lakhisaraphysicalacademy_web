// app/store/OrderModal.tsx
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createOrder } from "@/app/lib/action/orders";
import type { Product } from "../lib/store-data";

const MAX_QUANTITY = 20;

type FieldErrors = Partial<Record<
  "customerName" | "phone" | "street" | "city" | "district" | "pincode" | "quantity",
  string
>>;

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
    <p role="alert" className="mt-1 text-[12px] text-accent-strong">
      {message}
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

    const errors = validateFields(formData);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Move focus to the first invalid field for accessibility
      const firstInvalid = Object.keys(errors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
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
          <form action={handleSubmit} noValidate className="mt-6 space-y-4">
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
                ref={firstFieldRef}
                id="customerName"
                name="customerName"
                type="text"
                required
                disabled={isPending}
                onChange={() => clearFieldError("customerName")}
                aria-invalid={Boolean(fieldErrors.customerName)}
                aria-describedby={fieldErrors.customerName ? "customerName-error" : undefined}
                className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                  fieldErrors.customerName ? "border-accent-strong" : "border-line"
                }`}
                placeholder="Your full name"
              />
              {fieldErrors.customerName && (
                <span id="customerName-error">
                  <FieldError message={fieldErrors.customerName} />
                </span>
              )}
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
                onChange={() => clearFieldError("phone")}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                  fieldErrors.phone ? "border-accent-strong" : "border-line"
                }`}
                placeholder="10-digit mobile number"
              />
              {fieldErrors.phone && (
                <span id="phone-error">
                  <FieldError message={fieldErrors.phone} />
                </span>
              )}
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
                    onChange={() => clearFieldError("street")}
                    aria-invalid={Boolean(fieldErrors.street)}
                    aria-describedby={fieldErrors.street ? "street-error" : undefined}
                    className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                      fieldErrors.street ? "border-accent-strong" : "border-line"
                    }`}
                    placeholder="e.g. Ward No. 4, Station Road"
                  />
                  {fieldErrors.street && (
                    <span id="street-error">
                      <FieldError message={fieldErrors.street} />
                    </span>
                  )}
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
                      onChange={() => clearFieldError("city")}
                      aria-invalid={Boolean(fieldErrors.city)}
                      aria-describedby={fieldErrors.city ? "city-error" : undefined}
                      className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                        fieldErrors.city ? "border-accent-strong" : "border-line"
                      }`}
                      placeholder="e.g. Lakhisarai"
                    />
                    {fieldErrors.city && (
                      <span id="city-error">
                        <FieldError message={fieldErrors.city} />
                      </span>
                    )}
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
                      onChange={() => clearFieldError("district")}
                      aria-invalid={Boolean(fieldErrors.district)}
                      aria-describedby={fieldErrors.district ? "district-error" : undefined}
                      className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                        fieldErrors.district ? "border-accent-strong" : "border-line"
                      }`}
                      placeholder="e.g. Lakhisarai"
                    />
                    {fieldErrors.district && (
                      <span id="district-error">
                        <FieldError message={fieldErrors.district} />
                      </span>
                    )}
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
                    onChange={() => clearFieldError("pincode")}
                    aria-invalid={Boolean(fieldErrors.pincode)}
                    aria-describedby={fieldErrors.pincode ? "pincode-error" : undefined}
                    className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                      fieldErrors.pincode ? "border-accent-strong" : "border-line"
                    }`}
                    placeholder="e.g. 811311"
                  />
                  {fieldErrors.pincode && (
                    <span id="pincode-error">
                      <FieldError message={fieldErrors.pincode} />
                    </span>
                  )}
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
                  max={MAX_QUANTITY}
                  value={quantity}
                  disabled={isPending}
                  onChange={(e) => {
                    clearFieldError("quantity");
                    const val = e.target.value === "" ? 1 : Number(e.target.value);
                    setQuantity(Number.isNaN(val) ? 1 : val);
                  }}
                  aria-invalid={Boolean(fieldErrors.quantity)}
                  aria-describedby={fieldErrors.quantity ? "quantity-error" : undefined}
                  className={`w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-text outline-none transition-colors focus:border-signal disabled:opacity-60 ${
                    fieldErrors.quantity ? "border-accent-strong" : "border-line"
                  }`}
                />
                {fieldErrors.quantity && (
                  <span id="quantity-error">
                    <FieldError message={fieldErrors.quantity} />
                  </span>
                )}
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

            <div className="flex items-center justify-between border-t border-line pt-4 text-[13px]">
              <span className="text-text-muted">Order total</span>
              <span className="font-medium text-text">₹{subtotal.toLocaleString("en-IN")}</span>
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