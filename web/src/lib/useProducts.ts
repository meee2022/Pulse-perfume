"use client";

import { useQuery } from "convex/react";
import { listProductsRef } from "./convex";
import { PRODUCTS, type Product } from "./products";

type Row = {
  slug: string;
  name: string;
  meaning: string;
  price: number;
  accentHex: string;
  card: string;
  notesTop: string;
  notesHeart: string;
  notesBase: string;
  blurb: string;
  order: number;
  active: boolean;
};

// Merges Convex-managed fields (price, name, notes, active, order) over the
// static products (which own the images). Falls back to the static list when
// Convex has no data / is still loading / unreachable — so the shop never breaks.
const CONVEX_ON = process.env.NEXT_PUBLIC_CONVEX_ENABLED === "true";

export function useProducts(): Product[] {
  // "skip" until Convex is deployed & enabled, so the shop never depends on
  // functions that may not exist yet.
  const rows = useQuery(listProductsRef, CONVEX_ON ? {} : "skip") as Row[] | undefined;
  if (!rows || rows.length === 0) return PRODUCTS;

  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  return PRODUCTS.map((p) => ({ p, r: bySlug.get(p.id) }))
    .filter(({ r }) => !r || r.active !== false)
    .sort((a, b) => (a.r?.order ?? 0) - (b.r?.order ?? 0))
    .map(({ p, r }) =>
      r
        ? {
            ...p,
            name: r.name,
            meaning: r.meaning,
            price: r.price,
            accentHex: r.accentHex || p.accentHex,
            card: r.card || p.card,
            blurb: r.blurb,
            notes: { top: r.notesTop, heart: r.notesHeart, base: r.notesBase },
          }
        : p
    );
}

// static catalogue mapped to the Convex `products` shape (for the seed action)
export const seedPayload = PRODUCTS.map((p, i) => ({
  slug: p.id,
  name: p.name,
  meaning: p.meaning,
  price: p.price,
  colorway: p.colorway,
  accentHex: p.accentHex,
  card: p.card,
  notesTop: p.notes.top,
  notesHeart: p.notes.heart,
  notesBase: p.notes.base,
  blurb: p.blurb,
  order: i,
  active: true,
}));
