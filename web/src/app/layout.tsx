import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";
import { LangProvider } from "@/lib/lang";
import ConvexClientProvider from "@/components/ConvexProvider";

// Display — editorial high-contrast serif (soft, luxe, "Playfair" look)
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body — clean humanist sans, quiet and legible
const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PULSE — Move With It. | Modern Sport Scent",
    template: "%s · PULSE Perfume",
  },
  description:
    "PULSE — a scent that moves with you. An all-over spray in three colorways. Fine mist, long-lasting freshness.",
  keywords: ["PULSE", "perfume", "all-over spray", "sport scent", "fragrance", "عطر", "بلس"],
  openGraph: {
    title: "PULSE — Move With It.",
    description: "A scent that moves with you. Modern Sport Scent · Est. 2026.",
    url: SITE_URL,
    siteName: "PULSE Perfume",
    images: [{ url: "/images/hero-collection.png", width: 1672, height: 941 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "PULSE — Move With It." },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#7E836E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <ConvexClientProvider>
          <LangProvider>
            {children}
            <ServiceWorker />
          </LangProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
