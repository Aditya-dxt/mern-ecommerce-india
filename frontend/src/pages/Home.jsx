import { useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
      })
      .catch((err) => {
        console.error("Backend error:", err);
      });
  }, []);
  return (
    <div className="px-10 py-20 text-center bg-gray-50">
      <h1 className="text-5xl font-extrabold text-gray-800">
        Premium Shopping, Made for India 🇮🇳
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Discover fashion, electronics & lifestyle products at unbeatable prices.
      </p>

      <Link
        to="/products"
        className="inline-block mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
      >
        Shop Now
      </Link>
    </div>
  );
}
