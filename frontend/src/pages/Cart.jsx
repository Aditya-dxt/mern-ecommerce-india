import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="text-center mt-20">Your cart is empty</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-3 border p-3">
          <span>{item.title}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      {/* ✅ Checkout only if cart has items */}
      <button
        onClick={() =>
          navigate("/checkout", { state: { checkoutMode: "CART" } })
        }
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}