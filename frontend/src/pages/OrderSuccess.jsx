import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mt-2">
        Thank you for shopping with E-Shop
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
}