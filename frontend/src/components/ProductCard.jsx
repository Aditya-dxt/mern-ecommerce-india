export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>

      <p className="text-indigo-600 font-bold mt-1">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
 