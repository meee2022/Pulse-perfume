"use client";

import { useState } from "react";
import Nav from "./Nav";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import { useCart } from "@/lib/store";

export default function SiteChrome() {
  const [checkout, setCheckout] = useState(false);
  const closeCart = useCart((s) => s.close);

  return (
    <>
      <Nav />
      <CartDrawer
        onCheckout={() => {
          closeCart();
          setCheckout(true);
        }}
      />
      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </>
  );
}
