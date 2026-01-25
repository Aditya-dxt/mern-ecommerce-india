import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="mt-3 font-semibold text-lg">
        {product.title}
      </h3>

      <p className="text-gray-600 mt-1">₹{product.price}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-indigo-600 text-white py-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
