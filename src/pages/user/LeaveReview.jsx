import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Spinner from "../../components/common/Spinner";

const LeaveReview = () => {
  const { id } = useParams(); // packageId
  const navigate = useNavigate();
  const location = useLocation();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const packageTitle = location.state?.packageTitle || "Trip Package";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/reviews/create-review", {
        tripPackageId: id,
        rating,
        comment,
      });

      toast.success("Review submitted successfully!");
      navigate(`/package/${id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white shadow-2xl rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Leave a Review for
          <span className="block text-purple-600">{packageTitle}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, index) => {
              const current = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(current)}
                  onMouseEnter={() => setHover(current)}
                  onMouseLeave={() => setHover(null)}
                  className="focus:outline-none"
                >
                  <FaStar
                    size={32}
                    className={`transition ${
                      current <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Comment */}
          <textarea
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your honest thoughts about this trip..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-md transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner size={20} /> : "Submit Review"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LeaveReview;
