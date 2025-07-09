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
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:scale-[1.02]">
      <img
        className="w-full h-52 object-cover"
        src={images?.[0]?.url || "/default-image.jpg"}
        alt={title}
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{title}</h3>

        <div className="flex items-center text-sm text-gray-500 mt-2 gap-4">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-blue-500" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="text-yellow-500" />
            {duration} days
          </span>
        </div>

        <p className="text-gray-600 mt-3 text-sm line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-lg font-bold text-blue-600">₹{price}</span>
          <div className="flex gap-2">
            <button
              onClick={handleViewMore}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
            >
              View
            </button>
            <button
              onClick={handleBookNow}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
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
