import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/cart");

      if (data?.cart?.items) {
        setCartItems(data.cart.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  if (!cartItems.length) {
    return <p className="text-center mt-20">Your cart is empty</p>;
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="flex justify-between mb-3 border p-3"
        >
          <span>
            {item.product.name} × {item.quantity}
          </span>

          <button
            onClick={() => handleRemove(item.product._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 text-lg font-semibold">
        Total: ₹{totalAmount}
      </div>

      <button
        onClick={() =>
          navigate("/address", { state: { totalAmount } })
        }
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
