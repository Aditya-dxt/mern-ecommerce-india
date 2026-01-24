import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // mock: send OTP
    navigate("/verify-otp", {
      state: {
        email,
        type: "forgot",
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-10">
      <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Registered Email"
          required
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
}
