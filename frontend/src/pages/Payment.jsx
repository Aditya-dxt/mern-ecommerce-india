import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { useMemo, useEffect } from "react";
import { getStripe } from "../utils/stripeClient";
import CheckoutForm from "../components/payment/CheckoutForm";

export default function Payment() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { clientSecret, publishableKey } = location.state || {};

  useEffect(() => {
    if (!clientSecret || !publishableKey) {
      navigate("/", { replace: true });
    }
  }, [clientSecret, publishableKey, navigate]);

  const stripePromise = useMemo(() => {
    if (!publishableKey) return null;
    return getStripe(publishableKey);
  }, [publishableKey]);

  if (!clientSecret || !stripePromise) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Secure Card Payment
      </h1>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm orderId={orderId} clientSecret={clientSecret} />
      </Elements>
    </div>
  );
}
