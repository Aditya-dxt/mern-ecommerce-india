import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const totalAmount = location.state?.totalAmount;

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Safety: prevent direct access
  useEffect(() => {
    if (!totalAmount) {
      navigate("/", { replace: true });
    }
  }, [totalAmount, navigate]);

  const handlePlaceOrder = () => {
    // Day-06: frontend-only logic
    // Razorpay integration will come later
    navigate("/order-success");
  };

  if (!totalAmount) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Payment Method
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        {/* COD */}
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <div>
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-sm text-gray-500">
              Pay when the order is delivered
            </p>
          </div>
        </label>

        {/* Razorpay */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="razorpay"
            checked={paymentMethod === "razorpay"}
            onChange={() => setPaymentMethod("razorpay")}
          />
          <div>
            <p className="font-medium">Online Payment</p>
            <p className="text-sm text-gray-500">
              UPI / Card / Net Banking (Razorpay)
            </p>
          </div>
        </label>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center border-t pt-4 mb-6 text-lg font-semibold">
        <span>Total Payable</span>
        <span className="text-indigo-600">
          ₹{totalAmount}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg hover:bg-indigo-700 transition"
      >
        Place Order
      </button>
    </div>
  );
}