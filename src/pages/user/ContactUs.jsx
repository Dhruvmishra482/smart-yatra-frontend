import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import ButtonLoader from "../../components/common/ButtonLoader";
import api from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdSupportAgent } from "react-icons/md";

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
      navigate("/my-tickets");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create ticket");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
        <div className="bg-white shadow-xl rounded-lg px-8 py-6 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">
            Please Login First
          </h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to raise a support ticket.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 flex items-center justify-center px-4 py-14">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <MdSupportAgent className="text-5xl text-blue-600 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-blue-800">Need Help?</h2>
          <p className="text-gray-500 text-sm mt-1">
            Raise a support ticket and our team will reach out shortly.
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter ticket subject"
              value={userQuery.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Describe your issue in detail..."
              value={userQuery.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <ButtonLoader />}
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
