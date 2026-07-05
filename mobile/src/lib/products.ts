// ===== PULSE — canonical product & content data (mobile) =====
import type { ImageSourcePropType } from "react-native";

export type Colorway = "green" | "blue" | "grey";

export interface Product {
  id: string;
  name: string;
  meaning: string;
  price: number; // QAR
  colorway: Colorway;
  accentHex: string;
  bottle: ImageSourcePropType;
  box: ImageSourcePropType;
  notes: { top: string; heart: string; base: string };
  blurb: string;
}

// static requires (React Native needs literal paths)
const IMG = {
  bottleGreen: require("../../assets/images/pulse/bottle-green.png"),
  bottleBlue: require("../../assets/images/pulse/bottle-blue.png"),
  bottleGrey: require("../../assets/images/pulse/bottle-grey.png"),
  boxGreen: require("../../assets/images/pulse/box-green.png"),
  boxBlue: require("../../assets/images/pulse/box-blue.png"),
  boxGrey: require("../../assets/images/pulse/box-grey.png"),
  hero: require("../../assets/images/pulse/hero-shot.png"),
  boxes: require("../../assets/images/pulse/boxes.png"),
  testers: require("../../assets/images/pulse/testers.png"),
};

export const HERO_IMG = IMG.hero;
export const BOXES_IMG = IMG.boxes;
export const TESTERS_IMG = IMG.testers;

export const CURRENCY = "QAR";

export const PRODUCTS: Product[] = [
  {
    id: "bosque-mistico",
    name: "Bosque Místico",
    meaning: "Mystic Forest",
    price: 175,
    colorway: "green",
    accentHex: "#928f7c",
    bottle: IMG.bottleGreen,
    box: IMG.boxGreen,
    notes: { top: "Green · Fig · Cardamom", heart: "Forest Accord · Cypress", base: "Cashmere · Woods" },
    blurb: "A cool walk through wet pine and cardamom smoke. Grounded, green, alive.",
  },
  {
    id: "dulce-de-cuerpo",
    name: "Dulce de Cuerpo",
    meaning: "Sweetness of the Body",
    price: 165,
    colorway: "blue",
    accentHex: "#7b8aa0",
    bottle: IMG.bottleBlue,
    box: IMG.boxBlue,
    notes: { top: "Sweet Accord · Amber · Violet", heart: "Copal", base: "Vanilla · Sandalwood" },
    blurb: "Warm skin, soft amber and vanilla. The scent of being close.",
  },
  {
    id: "brisa-de-sal",
    name: "Brisa de Sal",
    meaning: "Salt Breeze",
    price: 185,
    colorway: "grey",
    accentHex: "#a29895",
    bottle: IMG.bottleGrey,
    box: IMG.boxGrey,
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
