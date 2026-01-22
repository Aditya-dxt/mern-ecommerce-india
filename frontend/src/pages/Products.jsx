import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products({ addToCart }) {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Shop Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
