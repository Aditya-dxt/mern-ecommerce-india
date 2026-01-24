import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = () => {
    // TEMP: simulate successful OTP verification
    login({ email: "adityadxt1910@gmail.com" }); // 🔥 updates auth state
    navigate("/"); // redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleVerifyOTP}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
