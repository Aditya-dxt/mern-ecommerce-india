import axios from "../utils/axios";

export default function ProductCard({ product }) {
  const handleAddToCart = async () => {
    try {
      await axios.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding to cart");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="mt-3 font-semibold text-lg">
        {product.name}
      </h3>

      <p className="text-gray-600 mt-1">₹{product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
