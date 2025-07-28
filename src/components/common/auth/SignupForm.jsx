import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import ButtonLoader from "../ButtonLoader";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "visitor",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", formData);
      toast.success(res.data.message);
      navigate("/verify-email", { state: res.data.userData });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-bl from-blue-100 via-white to-indigo-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-8">
          Sign Up
        </h2>

        <form onSubmit={submitHandler} className="space-y-4 text-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={changeHandler}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={changeHandler}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={changeHandler}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={changeHandler}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={changeHandler}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="accountType"
            value={formData.accountType}
            onChange={changeHandler}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="visitor">Visitor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all flex justify-center items-center gap-2"
          >
            {loading && <ButtonLoader />}
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6">
          <GoogleLogin
            width="100%"
            onSuccess={async (credentialResponse) => {
              try {
                const res = await api.post("/auth/google", {
                  idToken: credentialResponse.credential,
                });

                const { token } = res.data;
                login(token);
                toast.success("Google Signup Success");

                const { role } = jwtDecode(token);
                navigate(role === "admin" ? "/admin/dashboard" : "/");
              } catch (err) {
                console.error("Google Signup Error:", err);
                toast.error("Google Signup Failed");
              }
            }}
            onError={() => toast.error("Google Sign In Failed")}
          />
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;