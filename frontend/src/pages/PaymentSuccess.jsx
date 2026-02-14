import { useParams } from "react-router-dom";

export default function PaymentSuccess() {
  const { orderId } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Your order has been successfully placed.
      </p>

      <p className="font-medium">
        Order ID: {orderId}
      </p>
    </div>
  );
}
