import React, { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      });

      toast.success("Password reset successfully");
      setPasswords({ newPassword: "", confirmPassword: "" });
      setTimeout(() => {
  navigate("/login");
}, 2000);
    } catch (error) {
 
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Reset Your Password
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              required
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
