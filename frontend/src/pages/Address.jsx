import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function Address() {
  const navigate = useNavigate();
  const location = useLocation();

  const totalAmount = location.state?.totalAmount;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent direct access
  useEffect(() => {
    if (!totalAmount) {
      navigate("/", { replace: true });
    }
  }, [totalAmount, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      // 🔥 Create Order (Match Schema Exactly)
      const orderRes = await axios.post("/orders", {
        address: {
          fullName: formData.fullName,
          phone: formData.phone,
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
          addressLine: formData.addressLine,
        },
        paymentMethod: "Stripe", // 🔥 Must match enum exactly
      });

      const orderId = orderRes.data.order._id;

      // 🔥 Create PaymentIntent
      const paymentRes = await axios.post(
        `/payment/create-payment-intent/${orderId}`
      );

      const { clientSecret, publishableKey } = paymentRes.data;

      // 🔥 Navigate to Payment Page
      navigate(`/payment/${orderId}`, {
        state: { clientSecret, publishableKey },
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  if (!totalAmount) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Delivery Address
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <textarea
          name="addressLine"
          placeholder="House No, Street, Area"
          value={formData.addressLine}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border p-3 rounded-lg"
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <div className="flex justify-between text-lg font-semibold pt-4 border-t">
          <span>Total Payable</span>
          <span className="text-indigo-600">
            ₹{totalAmount}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}
