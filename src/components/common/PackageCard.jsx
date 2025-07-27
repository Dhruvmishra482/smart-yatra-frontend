import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const PackageCard = ({
  title,
  description,
  price,
  location,
  duration,
  images,
  id,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useAuth();

  const handleViewMore = () => {
    navigate(`/package/${id}`);
  };

  const handleBookNow = () => {
    if (loading) return;
    if (isLoggedIn) {
      navigate(`/checkout/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="group bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.025] transform hover:-rotate-1">
      <img
        src={images?.[0]?.url || "/default-image.jpg"}
        alt={title}
        className="w-full h-52 object-cover rounded-t-2xl group-hover:opacity-90 transition"
      />

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-blue-800 line-clamp-1">{title}</h3>

        <div className="flex items-center text-sm text-gray-600 gap-4">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-rose-500" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-yellow-500" />
            {duration} days
          </span>
        </div>

        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-indigo-600">₹{price}</span>
          <div className="flex gap-2">
            <button
              onClick={handleViewMore}
              className="px-4 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              View
            </button>
            <button
              onClick={handleBookNow}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm rounded-md transition"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
