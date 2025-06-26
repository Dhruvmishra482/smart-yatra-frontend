import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import ButtonLoader from "../../components/common/ButtonLoader";

import api from "../../utils/axiosInstance";
import { useNavigate ,Link} from "react-router-dom";
const ContactUs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userQuery, setUserQuery] = useState({
    subject: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserQuery({ ...userQuery, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/createticket", userQuery);
      toast.success(response.data.message);
    navigate("/my-tickets")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create ticket");
    }
    setLoading(false);
  };

  // 🔐 If user not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-50">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Please Login First
          </h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to raise a support ticket.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Raise a Support Ticket
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={userQuery.subject}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={userQuery.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <ButtonLoader />}
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;