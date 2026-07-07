import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCTS, SIZES, type SizeId } from "./products";

export interface CartLine {
  productId: string;
  size: SizeId;
  qty: number;
}

const key = (productId: string, size: SizeId) => `${productId}::${size}`;
const priceOf = (productId: string, size: SizeId) => {
  const p = PRODUCTS.find((x) => x.id === productId);
  if (!p) return 0;
  const mult = SIZES.find((s) => s.id === size)?.multiplier ?? 1;
  return Math.round(p.price * mult);
};

interface CartState {
  lines: CartLine[];
  add: (productId: string, size?: SizeId, qty?: number) => void;
  setQty: (productId: string, size: SizeId, qty: number) => void;
  remove: (productId: string, size: SizeId) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (productId, size = "100ml", qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.productId === productId && l.size === size);
          return {
            lines: existing
              ? s.lines.map((l) =>
                  l.productId === productId && l.size === size ? { ...l, qty: l.qty + qty } : l
                )
              : [...s.lines, { productId, size, qty }],
          };
        }),
      setQty: (productId, size, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.productId === productId && l.size === size ? { ...l, qty: Math.max(0, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      remove: (productId, size) =>
        set((s) => ({ lines: s.lines.filter((l) => !(l.productId === productId && l.size === size)) })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((sum, l) => sum + priceOf(l.productId, l.size) * l.qty, 0),
    }),
    { name: "pulse-cart-v2", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export { priceOf, key };
