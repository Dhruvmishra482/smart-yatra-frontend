// src/pages/VerifyEmail.jsx

import  { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../utils/axiosInstance";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/verify-otp", {
        otp,
        ...userData,
      });

      if (response.data.success) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
     
      toast.error("Failed to verify OTP and register");
    }
  };

return (
  <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
    <form
      onSubmit={handleVerify}
      className="w-full max-w-sm bg-white shadow-lg rounded-xl px-6 py-8 animate-fade-in-up transition-all duration-500"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Verify OTP
      </h2>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 hover:scale-[1.02] transition-transform duration-300"
      >
        Verify & Register
      </button>
    </form>
  </div>
);
}

export default VerifyEmail
