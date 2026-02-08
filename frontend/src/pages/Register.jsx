import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // mock: send OTP (email + mobile)
    navigate("/verify-otp", {
      state: {
        email: form.email,
        type: "register",
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="mobile"
          type="tel"
          placeholder="Mobile Number"
          required
          className="w-full border p-3 rounded"
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Create Password"
          required
          className="w-full border p-3 rounded"
          value={form.password}
          onChange={handleChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full border p-3 rounded"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <button className="w-full bg-indigo-600 text-white py-3 rounded">
          Register & Verify
        </button>
      </form>
    </div>
  );
}