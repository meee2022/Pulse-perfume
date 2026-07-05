import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCTS } from "./products";

export interface CartLine {
  productId: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (productId, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.productId === productId);
          return {
            lines: existing
              ? s.lines.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
              : [...s.lines, { productId, qty }],
          };
        }),
      setQty: (productId, qty) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.productId === productId ? { ...l, qty: Math.max(0, qty) } : l)).filter((l) => l.qty > 0),
        })),
      remove: (productId) => set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () =>
        get().lines.reduce((sum, l) => {
          const p = PRODUCTS.find((x) => x.id === l.productId);
          return p ? sum + p.price * l.qty : sum;
        }, 0),
    }),
    { name: "pulse-cart", storage: createJSONStorage(() => AsyncStorage) }
  )
);
