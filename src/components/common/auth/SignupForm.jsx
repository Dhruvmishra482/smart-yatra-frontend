import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import api from "../../../utils/axiosInstance";
import ButtonLoader from "../ButtonLoader";

const Signup = () => {
  const navigate = useNavigate();
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
  <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4">
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl animate-fade-in-up transition-all duration-500">
      <h2 className="text-3xl font-bold text-sky-800 text-center mb-6">Start Your travel journey</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Name Fields */}
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={changeHandler}
            required
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-3xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={changeHandler}
            required
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-3xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]"
          />
        </div>

        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={changeHandler}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={changeHandler}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={changeHandler}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={changeHandler}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl text-sm text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:scale-[1.02]"
        />

        <select
          name="accountType"
          value={formData.accountType}
          onChange={changeHandler}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl text-sm bg-white text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="visitor">Visitor</option>
          <option value="admin">Admin</option>
        </select>

       <button
  type="submit"
  disabled={loading}
  className="w-full py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 hover:scale-[1.02] transition-transform duration-300 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading && <ButtonLoader />}
  {loading ? "Creating..." : "Sign Up"}
</button>

      </form>

      <div className="mt-4 transition-transform px-12 duration-300 hover:scale-[1.02]">
        <GoogleButton
          className="w-full"
          onClick={() => toast("Google login not implemented")}
        />
      </div>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
);
};

export default Signup;
