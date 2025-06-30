import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY as string;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2025-05-28.basil",
});

export default stripe;
