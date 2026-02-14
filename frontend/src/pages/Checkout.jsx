import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/cart");

        if (data.cart && data.cart.items) {
          setCartItems(data.cart.items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };

    fetchCart();
  }, []);

  if (!cartItems || cartItems.length === 0) {
    navigate("/products", { replace: true });
    return null;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Order Summary
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between border-b pb-3 mb-3"
          >
            <span>{item.product.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={() =>
          navigate("/address", {
            state: { totalAmount: total },
          })
        }
        className="w-full bg-indigo-600 text-white py-3 rounded-xl"
      >
        Continue to Address
      </button>
    </div>
  );
}
