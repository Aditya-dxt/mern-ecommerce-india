import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);

  // Items can come from Buy Now OR Cart
  const items =
    location.state?.items && location.state.items.length > 0
      ? location.state.items
      : cart;

  // Safety: no items → redirect
  if (!items || items.length === 0) {
    navigate("/products", { replace: true });
    return null;
  }

  const total = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Checkout
      </h1>

      {/* Order Summary Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Order Summary
        </h2>

        {/* Products */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b pb-3"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500">
                  Product ID: {item.id}
                </p>
              </div>

              <p className="font-semibold text-gray-800">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <span className="text-lg font-semibold">
            Total Amount
          </span>
          <span className="text-xl font-bold text-indigo-600">
            ₹{total}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() =>
          navigate("/address", {
            state: { totalAmount: total },
          })
        }
        className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition"
      >
        Continue to Address
      </button>
    </div>
  );
}