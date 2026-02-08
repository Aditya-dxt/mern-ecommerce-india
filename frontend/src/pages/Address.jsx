import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Address() {
  const navigate = useNavigate();
  const location = useLocation();

  const totalAmount = location.state?.totalAmount;

  // ✅ Hooks must be called unconditionally
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  // ✅ Redirect safely using useEffect
  useEffect(() => {
    if (!totalAmount) {
      navigate("/", { replace: true });
    }
  }, [totalAmount, navigate]);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later → backend integration
    console.log("Address submitted:", address);

    navigate("/payment", {
  state: { totalAmount },
});

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
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={address.phone}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <textarea
          name="addressLine"
          placeholder="House No, Street, Area"
          value={address.addressLine}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border p-3 rounded-lg"
        />

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold pt-4 border-t">
          <span>Total Payable</span>
          <span className="text-indigo-600">
            ₹{totalAmount}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg hover:bg-indigo-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}