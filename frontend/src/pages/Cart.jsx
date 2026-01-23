import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) navigate("/login");
    else alert("Checkout coming next 🚀");
  };

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-4 rounded mb-4"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-indigo-600 font-bold">₹{item.price}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <h3 className="text-xl font-bold">Total: ₹{total}</h3>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
