import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  const { isLoggedIn, loading, user } = useAuth();

  const handleViewMore = () => {
    navigate(`/package/${id}`);
  };

  const handleBookNow = () => {
    if (loading) return; // Wait till auth loads
    if (isLoggedIn) {
      navigate(`/checkout/${id}`);
    } else {
      navigate("/login");
    }
  };






  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={images?.[0]?.url || "/default-image.jpg"}
        alt={title}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {location} • {duration} days
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>

        <p className="text-blue-600 font-bold mt-3">₹{price}</p>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
          >
            View More
          </button>
          <button
            onClick={handleBookNow}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
