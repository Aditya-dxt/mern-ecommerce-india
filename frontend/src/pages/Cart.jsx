import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Your Cart is Empty 🛒
        </h2>
        <p className="text-gray-600">
          Add products to see them here.
        </p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-indigo-600 font-bold">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h3 className="text-2xl font-bold">
          Total: ₹{total}
        </h3>
      </div>
    </div>
  );
}
