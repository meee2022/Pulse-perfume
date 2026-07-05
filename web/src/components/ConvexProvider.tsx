"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo } from "react";

// Defaults to the project's deployment; override with NEXT_PUBLIC_CONVEX_URL.
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "https://notable-lemming-557.convex.cloud";

export default function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => new ConvexReactClient(CONVEX_URL), []);
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
