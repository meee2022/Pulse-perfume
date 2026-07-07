// ===== PULSE — canonical product & content data =====
// نفس البيانات مستخدمة في الويب والموبايل (shared/pulse-data.ts)

export type Colorway = "green" | "blue" | "grey" | "black";

export interface Product {
  id: string;
  name: string;
  meaning: string;
  price: number; // QAR
  colorway: Colorway;
  accentHex: string; // matches the studio background of that colorway shot
  bottle: string; // /images/bottle-*.png
  box: string; // /images/box-*.png
  card: string; // square studio shot for product cards
  notes: { top: string; heart: string; base: string };
  blurb: string;
}

// transparent cutout assets for the scroll reveal
export const REVEAL = {
  box: "/images/reveal-box.png",
  perfume: "/images/reveal-perfume.png",
};

export const CURRENCY = "QAR";

export const PRODUCTS: Product[] = [
  {
    id: "bosque-mistico",
    name: "MOTION",
    meaning: "Green · Aromatic",
    price: 250,
    colorway: "green",
    accentHex: "#928f7c",
    bottle: "/images/bottle-green.png",
    box: "/images/box-green.png",
    card: "/images/card-green.jpg",
    notes: {
      top: "Green · Fig · Cardamom",
      heart: "Forest Accord · Cypress",
      base: "Cashmere · Woods",
    },
    blurb: "A cool walk through wet pine and cardamom smoke. Grounded, green, alive.",
  },
  {
    id: "dulce-de-cuerpo",
    name: "ACTIVE",
    meaning: "Fresh · Citrus",
    price: 250,
    colorway: "blue",
    accentHex: "#7b8aa0",
    bottle: "/images/bottle-blue.png",
    box: "/images/box-blue.png",
    card: "/images/card-blue.jpg",
    notes: {
      top: "Sweet Accord · Amber · Violet",
      heart: "Copal",
      base: "Vanilla · Sandalwood",
    },
    blurb: "Warm skin, soft amber and vanilla. The scent of being close.",
  },
  {
    id: "brisa-de-sal",
    name: "PERFORMANCE",
    meaning: "Woody · Clean",
    price: 250,
    colorway: "grey",
    accentHex: "#a29895",
    bottle: "/images/bottle-grey.png",
    box: "/images/box-grey.png",
    card: "/images/card-grey.jpg",
    notes: {
      top: "Bergamot · Marine Accord",
      heart: "Jasmine · Sea Salt",
      base: "Amber · Musk",
    },
    blurb: "Open air off the water — bergamot, salt and clean musk.",
  },
  {
    id: "noir",
    name: "INTENSE",
    meaning: "Dark · Amber",
    price: 300,
    colorway: "black",
    accentHex: "#b7afa4",
    bottle: "/images/bottle-black.png",
    box: "/images/black-set.jpg",
    card: "/images/card-black.jpg",
    notes: {
      top: "Black Pepper · Bergamot",
      heart: "Oud · Leather",
      base: "Amber · Vetiver",
    },
    blurb: "Matte black, iridescent mark. Deep amber and smoked woods for after dark.",
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const BENEFITS = [
  { key: "clothes", title: "Refreshes Clothes", desc: "A fine veil that revives fabric between wears." },
  { key: "odors", title: "Neutralizes Odors", desc: "Not a mask — it resets the air around you." },
  { key: "travel", title: "Perfect for Travel", desc: "Cabin-friendly 100 ML in its own carry tube." },
  { key: "mist", title: "Fine Mist Technology", desc: "An even, weightless spray that never soaks." },
  { key: "lasting", title: "Long-Lasting Freshness", desc: "Built to move with you from morning to night." },
];

export const PROMISE = [
  "Refreshes Clothes",
  "Neutralizes Odors",
  "Perfect for Travel",
  "Fine Mist Technology",
  "Long-Lasting Freshness",
];

export const SIZES = [
  { id: "100ml", label: "100 ML — All-Over Spray", multiplier: 1 },
  { id: "3ml", label: "3 ML — Discovery Tester", multiplier: 0.18 },
];

export const CONTENT = {
  brand: "PULSE",
  wordmarkSub: "PERFUME",
  heroTagline: "Move With It.",
  heroSub: "A scent that moves with you.",
  heroProduct: "All-Over Spray · 100 ML",
  est: "Modern Sport Scent · Est. 2026",
  packagingTitle: "Concrete Calm",
  packagingBody:
    "Matte soft-touch bottles in the colorway, debossed with the PULSE mark, capped in gloss black. Each ships inside a cylindrical tube carrier with a black rope handle.",
  microTaglines: ["Fresh that lasts.", "Feel the pulse.", "Move with it."],
  colorwaysTitle: "New Colorway",
  colorwaysSub: "Matte concrete texture · Soft light",
  colorways: [
    { name: "Dusty Green", hex: "#AEB39D" },
    { name: "Dusty Blue", hex: "#93A6B8" },
    { name: "Dusty Grey", hex: "#C2C4C7" },
  ],
};
