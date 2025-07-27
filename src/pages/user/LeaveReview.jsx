import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const LeaveReview = () => {
  const { id: tripPackageId } = useParams();
  const { state } = useLocation();
  const { packageTitle } = state || {};
  const { token } = useAuth();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post(
        "/create-review",
        { tripPackageId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Review submitted!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-sky-200 to-blue-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl border border-gray-200 animate-fade-in-up"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">
          Leave a Review for{" "}
          <span className="text-black">{packageTitle || "the package"}</span>
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Rating (1-5)</span>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-medium">Comment</span>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Share your experience..."
            required
          ></textarea>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default LeaveReview;
