import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import ButtonLoader from "../ButtonLoader";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      login(token); // context update
      toast.success("Login Successful");

      const { role } = jwtDecode(token);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 w-full flex flex-col gap-y-5 animate-fade-in-up"
    >
      {/* Email Field */}
      <label className="w-full">
        <p className="mb-1 text-sm text-gray-700 font-medium">
          Email Address <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
      </label>

      {/* Password Field */}
      <label className="w-full relative">
        <p className="mb-1 text-sm text-gray-700 font-medium">
          Password <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter password"
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={22} className="text-gray-500" />
          ) : (
            <AiOutlineEye size={22} className="text-gray-500" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 text-right text-sm text-blue-600 hover:underline transition-all">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading && <ButtonLoader />}
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-x-2 mt-4">
        <div className="h-px w-full bg-gray-300" />
        <p className="text-gray-500 text-sm">or</p>
        <div className="h-px w-full bg-gray-300" />
      </div>

      {/* Google Login */}
     {/* Google Login */}
<div className="mt-1">
  <GoogleLogin
    width="100%"
    onSuccess={async (credentialResponse) => {
      try {
        const res = await api.post(
          "/auth/google",
          {
            idToken: credentialResponse.credential,
          },
          {
            withCredentials: true, // ✅ send cookie with request (already set in axios instance)
          }
        );

        const { token } = res.data;

        login(token); // ✅ context update (React)

        const { role } = jwtDecode(token);
        toast.success("Google Login Successful");

        navigate(role === "admin" ? "/admin/dashboard" : "/");
      } catch (err) {
        console.error("Google login error:", err);
        toast.error("Google Login Failed");
      }
    }}
    onError={() => {
      toast.error("Google Sign in Failed");
    }}
  />

      </div>
    </form>
  );
}

export default LoginForm;
