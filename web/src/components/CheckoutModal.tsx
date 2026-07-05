"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { PRODUCTS, SIZES } from "@/lib/products";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";
import { createOrderRef } from "@/lib/convex";

type Status = "form" | "loading" | "success";

const STRIPE_ON = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

export default function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, clear } = useCart();
  const subtotal = useCart((s) => s.subtotal());
  const { t, money } = useLang();
  const createOrder = useMutation(createOrderRef);
  const [status, setStatus] = useState<Status>("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // for Stripe line items
  const items = lines.map((l) => {
    const p = PRODUCTS.find((x) => x.id === l.productId)!;
    const s = SIZES.find((x) => x.id === l.sizeId)!;
    return { name: `${p.name} · ${s.id === "100ml" ? t.notes.size100 : t.notes.size3}`, price: Math.round(p.price * s.multiplier), qty: l.qty };
  });

  // structured items for the Convex order record
  const orderItems = lines.map((l) => {
    const p = PRODUCTS.find((x) => x.id === l.productId)!;
    const s = SIZES.find((x) => x.id === l.sizeId)!;
    return { productId: p.id, name: p.name, size: s.id, qty: l.qty, price: Math.round(p.price * s.multiplier) };
  });

  // save the order to Convex (no-op if functions aren't deployed yet)
  async function saveOrder() {
    try {
      await createOrder({ customer: form, items: orderItems, total: subtotal, currency: "QAR" });
    } catch {
      /* Convex not reachable / functions not deployed — order still confirmed locally */
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    if (STRIPE_ON) {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, customer: form }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        throw new Error(data.error || "failed");
      } catch {
        await saveOrder();
        setStatus("success");
        clear();
        return;
      }
    }

    await new Promise((r) => setTimeout(r, 700));
    await saveOrder();
    setStatus("success");
    clear();
  }

  function reset() {
    setStatus("form");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status === "loading" ? undefined : reset}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
          />
          <div className="pointer-events-none fixed inset-0 z-[71] grid place-items-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="pointer-events-auto w-[min(92vw,520px)] overflow-hidden rounded-[26px] bg-paper-1 shadow-2xl"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center px-8 py-14 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-olive text-paper-1">
                    <Check size={30} />
                  </div>
                  <h2 className="mt-6 font-display text-2xl uppercase tracking-wide2 text-ink">{t.checkout.successTitle}</h2>
                  <p className="mt-3 max-w-sm text-ink/65">{t.checkout.successBody}</p>
                  <button onClick={reset} className="btn-solid mt-8">
                    {t.checkout.back}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                    <h2 className="font-display text-sm uppercase tracking-wide1 text-ink">{t.checkout.title}</h2>
                    <button onClick={reset} disabled={status === "loading"} className="text-ink/60 hover:text-ink">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={submit} className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-6">
                    <div className="rounded-2xl border border-ink/10 bg-white/50 p-4">
                      {items.map((it, i) => (
                        <div key={i} className="flex justify-between py-1 text-sm">
                          <span className="text-ink/70">
                            {it.name} × {it.qty}
                          </span>
                          <span className="text-ink">{money(it.price * it.qty)}</span>
                        </div>
                      ))}
                      <div className="mt-2 flex justify-between border-t border-ink/10 pt-2 font-display text-sm uppercase tracking-wide2">
                        <span>{t.checkout.total}</span>
                        <span>{money(subtotal)}</span>
                      </div>
                    </div>

                    <Field label={t.checkout.fields.name} value={form.name} onChange={set("name")} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t.checkout.fields.email} type="email" value={form.email} onChange={set("email")} />
                      <Field label={t.checkout.fields.phone} value={form.phone} onChange={set("phone")} />
                    </div>
                    <Field label={t.checkout.fields.address} value={form.address} onChange={set("address")} />
                    <Field label={t.checkout.fields.city} value={form.city} onChange={set("city")} />

                    <button type="submit" disabled={status === "loading"} className="btn-solid mt-2 w-full">
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> {t.checkout.processing}
                        </>
                      ) : STRIPE_ON ? (
                        `${t.checkout.pay} ${money(subtotal)}`
                      ) : (
                        `${t.checkout.place} · ${money(subtotal)}`
                      )}
                    </button>
                    {!STRIPE_ON && <p className="text-center text-xs text-ink/40">{t.checkout.demoNote}</p>}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[11px] uppercase tracking-wide2 text-ink/50">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-olive"
      />
    </label>
  );
}
