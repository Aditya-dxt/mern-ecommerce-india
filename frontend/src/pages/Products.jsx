import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Declare function FIRST
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products);
    } catch (error) {
      console.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Then use it
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
