import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = (publishableKey) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
