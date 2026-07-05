// ===== PULSE — UI strings (English) =====
export type Lang = "en";

export const DICT = {
  en: {
    currency: "QAR",
    dir: "ltr" as const,
    nav: { range: "Range", unbox: "Unboxing", promise: "Promise", colorway: "Colorway", contact: "Contact", openCart: "Open cart", menu: "Menu" },
    hero: {
      est: "Modern Sport Scent · Est. 2026",
      tagline: "Move With It.",
      sub: "A scent that moves with you.",
      product: "All-Over Spray · 100 ML",
      cta1: "Discover the Range",
      cta2: "See the Unboxing",
    },
    benefits: {
      title: "Why PULSE?",
      clothes: { t: "Refreshes Clothes", d: "A fine veil that revives fabric between wears." },
      odors: { t: "Neutralizes Odors", d: "Not a mask — it resets the air around you." },
      travel: { t: "Perfect for Travel", d: "Cabin-friendly 100 ML in its own carry tube." },
      mist: { t: "Fine Mist Technology", d: "An even, weightless spray that never soaks." },
      lasting: { t: "Long-Lasting Freshness", d: "Built to move with you from morning to night." },
    },
    unbox: {
      eyebrow: "Unboxing",
      steps: [
        { k: "The Tube", t: "A cylindrical carrier with a rope handle", d: "Each scent arrives inside a matte tube with a black rope handle." },
        { k: "The Bottle", t: "Matte bottle, gloss-black cap", d: "Soft-touch, debossed with the PULSE mark — it lifts from the tube." },
        { k: "The Collection", t: "Three colorways", d: "Dusty Green · Dusty Blue · Dusty Grey — pick your pulse." },
      ],
      cta: "Add to Cart",
    },
    range: { eyebrow: "The Range", title: "Four Scents", sub: "One all-over spray, four moods. Pick your pulse." },
    notes: { top: "Top", heart: "Heart", base: "Base", size100: "100 ML", size3: "3 ML Tester", add: "Add" },
    promise: {
      eyebrow: "The Promise",
      title: "Fresh that lasts.",
      body: "PULSE isn't a cover-up. It resets the air around you and your clothes with a weightless, even mist — then keeps moving with you all day.",
      micro: ["Fresh that lasts.", "Feel the pulse.", "Move with it."],
      items: ["Refreshes Clothes", "Neutralizes Odors", "Perfect for Travel", "Fine Mist Technology", "Long-Lasting Freshness"],
    },
    packaging: {
      eyebrow: "Packaging",
      title: "Concrete Calm",
      body: "Matte soft-touch bottles debossed with the PULSE mark, capped in gloss black. Each ships inside a cylindrical tube carrier with a black rope handle.",
      specs: [["Finish", "Matte soft-touch"], ["Mark", "Debossed PULSE"], ["Cap", "Gloss black"], ["Carrier", "Tube · rope handle"]],
    },
    colorway: { eyebrow: "New Colorway", title: "Concrete Calm", sub: "Matte concrete texture · Soft light", names: ["Dusty Green", "Dusty Blue", "Dusty Grey"] },
    footer: {
      explore: "Explore", follow: "Follow",
      ship: "PULSE ships across the GCC.\nFollow the drop on Instagram & Snapchat.",
      copy: "© 2026 Pulse Perfume · Est. 2026", tagline: "Feel the pulse.", cta: "Discover the Range",
      links: [["Range", "#range"], ["Unboxing", "#unbox"], ["The Promise", "#promise"], ["Colorway", "#colorway"]],
    },
    cart: { title: "Your Cart", empty: "Your cart is empty.", browse: "Browse the Range", subtotal: "Subtotal", shipping: "Shipping & taxes calculated at checkout.", checkout: "Checkout" },
    checkout: {
      title: "Checkout", total: "Total",
      fields: { name: "Full Name", email: "Email", phone: "Phone", address: "Delivery Address", city: "City" },
      pay: "Pay", place: "Place Order", processing: "Processing…",
      demoNote: "Demo checkout — add Stripe keys to enable live card payments.",
      successTitle: "Order Placed!",
      successBody: "Thank you for choosing PULSE. Your order is being prepared and will be delivered soon.",
      back: "Back to Home",
    },
  },
};

export type Dict = (typeof DICT)["en"];
