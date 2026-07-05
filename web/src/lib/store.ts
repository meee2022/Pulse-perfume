"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, SIZES } from "./products";

export interface CartLine {
  key: string; // productId::sizeId
  productId: string;
  sizeId: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (productId: string, sizeId: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  count: () => number;
  subtotal: () => number;
}

const lineKey = (p: string, s: string) => `${p}::${s}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (productId, sizeId, qty = 1) =>
        set((state) => {
          const key = lineKey(productId, sizeId);
          const existing = state.lines.find((l) => l.key === key);
          const lines = existing
            ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
            : [...state.lines, { key, productId, sizeId, qty }];
          return { lines, isOpen: true };
        }),
      setQty: (key, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.key === key ? { ...l, qty: Math.max(0, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      remove: (key) => set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () =>
        get().lines.reduce((sum, l) => {
          const p = PRODUCTS.find((x) => x.id === l.productId);
          const s = SIZES.find((x) => x.id === l.sizeId);
          if (!p || !s) return sum;
          return sum + Math.round(p.price * s.multiplier) * l.qty;
        }, 0),
    }),
    { name: "pulse-cart" }
  )
);

export const money = (n: number) => `QAR ${n.toLocaleString("en")}`;
