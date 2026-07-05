"use client";

import { useQuery } from "convex/react";
import { getSettingsRef } from "./convex";

const CONVEX_ON = process.env.NEXT_PUBLIC_CONVEX_ENABLED === "true";

export type SiteSettings = {
  heroEyebrow: string | null;
  heroTagline: string | null;
  heroSub: string | null;
  heroVideo: string | null;
  heroPoster: string | null;
} | null;

// Admin-managed hero/site settings; null until Convex is enabled + populated.
export function useSettings(): SiteSettings {
  const s = useQuery(getSettingsRef, CONVEX_ON ? {} : "skip") as SiteSettings | undefined;
  return s ?? null;
}
