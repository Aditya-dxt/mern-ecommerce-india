import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ orderId, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setError("");

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      navigate(`/order-success/${orderId}`);
    } else {
      setProcessing(false);
      setError("Payment processing. Please wait.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="border p-4 rounded-md mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
        />
      </div>

      {error && (
        <p className="text-red-500 mb-4 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
