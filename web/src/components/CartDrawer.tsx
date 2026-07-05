"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { PRODUCTS, SIZES } from "@/lib/products";
import { useCart } from "@/lib/store";
import { useLang } from "@/lib/lang";

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { lines, isOpen, close, setQty, remove } = useCart();
  const subtotal = useCart((s) => s.subtotal());
  const { t, money } = useLang();

  const detail = (productId: string, sizeId: string) => {
    const p = PRODUCTS.find((x) => x.id === productId)!;
    const s = SIZES.find((x) => x.id === sizeId)!;
    const price = Math.round(p.price * s.multiplier);
    return { p, s, price };
  };

  const off = "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: off }}
            animate={{ x: 0 }}
            exit={{ x: off }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="fixed end-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-paper-1 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-sm uppercase tracking-wide1 text-ink">{t.cart.title}</h2>
              <button onClick={close} aria-label="Close" className="text-ink/60 hover:text-ink">
                <X size={20} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} strokeWidth={1} className="text-ink/25" />
                <p className="text-ink/50">{t.cart.empty}</p>
                <button onClick={close} className="btn-line">
                  {t.cart.browse}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {lines.map((l) => {
                    const { p, s, price } = detail(l.productId, l.sizeId);
                    return (
                      <div key={l.key} className="flex gap-4 rounded-2xl border border-ink/8 bg-white/60 p-3">
                        <div
                          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl"
                          style={{ backgroundColor: p.accentHex }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.bottle} alt={p.name} className="absolute inset-0 h-[130%] w-full object-contain" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-display text-sm uppercase tracking-wide2 text-ink">{p.name}</h3>
                              <p className="text-xs text-ink/50">{s.id === "100ml" ? t.notes.size100 : t.notes.size3}</p>
                            </div>
                            <button onClick={() => remove(l.key)} className="text-ink/40 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                              <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="-">
                                <Minus size={14} />
                              </button>
                              <span className="w-5 text-center text-sm">{l.qty}</span>
                              <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="+">
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-display text-sm tracking-wide2">{money(price * l.qty)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-ink/10 px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink/60">{t.cart.subtotal}</span>
                    <span className="font-display text-lg tracking-wide2 text-ink">{money(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink/45">{t.cart.shipping}</p>
                  <button onClick={onCheckout} className="btn-solid mt-4 w-full">
                    {t.cart.checkout}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
