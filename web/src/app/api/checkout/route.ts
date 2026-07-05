import { NextResponse } from "next/server";
import Stripe from "stripe";

// POST /api/checkout — creates a Stripe Checkout Session.
// If no STRIPE_SECRET_KEY is set, returns a soft error and the client
// falls back to the demo confirmation flow.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 200 });
  }

  try {
    const stripe = new Stripe(key);
    const { items, customer } = (await req.json()) as {
      items: { name: string; price: number; qty: number }[];
      customer: { email?: string };
    };

    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer?.email || undefined,
      line_items: items.map((it) => ({
        quantity: it.qty,
        price_data: {
          currency: "qar",
          unit_amount: it.price * 100, // QAR → smallest unit
          product_data: { name: it.name },
        },
      })),
      success_url: `${origin}/?order=success`,
      cancel_url: `${origin}/?order=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
