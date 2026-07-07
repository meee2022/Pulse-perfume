// ===== PULSE — canonical product & content data (mobile) =====
// Kept in sync with the web app: 4 scents (MOTION / ACTIVE / PERFORMANCE / INTENSE),
// QAR pricing, cinematic campaign imagery. INTENSE leads (premium, top-priced).
import type { ImageSourcePropType } from "react-native";

export type Colorway = "green" | "blue" | "grey" | "black";
export type SizeId = "100ml" | "3ml";

export interface Product {
  id: string;
  name: string;
  meaning: string;
  price: number; // QAR (100 ML)
  colorway: Colorway;
  accentHex: string;
  card: ImageSourcePropType; // cinematic 100 ML scene
  tester: ImageSourcePropType; // cinematic 3 ML tester scene
  notes: { top: string; heart: string; base: string };
  blurb: string;
}

// static requires (React Native needs literal paths)
const IMG = {
  cardMotion: require("../../assets/images/pulse/card-motion.jpg"),
  cardActive: require("../../assets/images/pulse/card-active.jpg"),
  cardPerformance: require("../../assets/images/pulse/card-performance.jpg"),
  cardIntense: require("../../assets/images/pulse/card-intense.jpg"),
  testerMotion: require("../../assets/images/pulse/tester-motion.jpg"),
  testerActive: require("../../assets/images/pulse/tester-active.jpg"),
  testerPerformance: require("../../assets/images/pulse/tester-performance.jpg"),
  testerIntense: require("../../assets/images/pulse/tester-intense.jpg"),
  hero: require("../../assets/images/pulse/hero.jpg"),
  boxes: require("../../assets/images/pulse/boxes.png"),
  testers: require("../../assets/images/pulse/testers.png"),
};

export const HERO_IMG = IMG.hero;
export const BOXES_IMG = IMG.boxes;
export const TESTERS_IMG = IMG.testers;

export const CURRENCY = "QAR";

export const SIZES: { id: SizeId; label: string; multiplier: number }[] = [
  { id: "100ml", label: "100 ML — All-Over Spray", multiplier: 1 },
  { id: "3ml", label: "3 ML — Discovery Tester", multiplier: 0.18 },
];

export const COLORNAME: Record<Colorway, string> = {
  green: "Dusty Green",
  blue: "Dusty Blue",
  grey: "Dusty Grey",
  black: "Matte Black",
};

export const PRODUCTS: Product[] = [
  {
    id: "noir",
    name: "INTENSE",
    meaning: "Dark · Amber",
    price: 300,
    colorway: "black",
    accentHex: "#b7afa4",
    card: IMG.cardIntense,
    tester: IMG.testerIntense,
    notes: { top: "Black Pepper · Bergamot", heart: "Oud · Leather", base: "Amber · Vetiver" },
    blurb: "Matte black, iridescent mark. Deep amber and smoked woods for after dark.",
  },
  {
    id: "bosque-mistico",
    name: "MOTION",
    meaning: "Green · Aromatic",
    price: 250,
    colorway: "green",
    accentHex: "#928f7c",
    card: IMG.cardMotion,
    tester: IMG.testerMotion,
    notes: { top: "Green · Fig · Cardamom", heart: "Forest Accord · Cypress", base: "Cashmere · Woods" },
    blurb: "A cool walk through wet pine and cardamom smoke. Grounded, green, alive.",
  },
  {
    id: "dulce-de-cuerpo",
    name: "ACTIVE",
    meaning: "Fresh · Citrus",
    price: 250,
    colorway: "blue",
    accentHex: "#7b8aa0",
    card: IMG.cardActive,
    tester: IMG.testerActive,
    notes: { top: "Sweet Accord · Amber · Violet", heart: "Copal", base: "Vanilla · Sandalwood" },
    blurb: "Warm skin, soft amber and vanilla. The scent of being close.",
  },
  {
    id: "brisa-de-sal",
    name: "PERFORMANCE",
    meaning: "Woody · Clean",
    price: 250,
    colorway: "grey",
    accentHex: "#a29895",
    card: IMG.cardPerformance,
    tester: IMG.testerPerformance,
    notes: { top: "Bergamot · Marine Accord", heart: "Jasmine · Sea Salt", base: "Amber · Musk" },
    blurb: "Open air off the water — bergamot, salt and clean musk.",
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const BENEFITS = [
  "Refreshes Clothes",
  "Neutralizes Odors",
  "Perfect for Travel",
  "Fine Mist Technology",
  "Long-Lasting Freshness",
];

export const CONTENT = {
  heroTagline: "Move With It.",
  heroSub: "A scent that moves with you.",
  est: "Modern Sport Scent · Est. 2026",
  packagingTitle: "Concrete Calm",
  packagingBody:
    "Matte soft-touch bottles debossed with the PULSE mark, capped in gloss black — each in a cylindrical tube carrier with a rope handle.",
};

export const money = (n: number) => `QAR ${n.toLocaleString("en")}`;
