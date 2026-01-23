import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Add product to cart first
    addToCart(product);

    // If not logged in → ask to login
    if (!user) {
      navigate("/login");
    } else {
      // Later this will be /checkout
      navigate("/cart");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      <h3 className="mt-3 font-semibold">{product.name}</h3>

      <p className="text-indigo-600 font-bold">₹{product.price}</p>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="w-full border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
