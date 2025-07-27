import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import Spinner from "../components/common/Spinner";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTag,
  FaUserAlt,
  FaStar,
} from "react-icons/fa";

const SinglePackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singlePackage, setSinglePackage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/package/getpackage/${id}`);
        setSinglePackage(res.data.data);
      } catch (error) {
        console.error("Failed to fetch package:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading)
    return (
      <div className="mt-20 flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (!singlePackage)
    return (
      <p className="text-center text-lg mt-20 text-red-500">
        Package not found.
      </p>
    );

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 flex flex-col lg:flex-row gap-10"
        >
          {/* Image Section */}
          <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-md">
            <img
              src={singlePackage.images?.[0]?.url || "/default.jpg"}
              alt={singlePackage.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Package Details */}
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-blue-800">
              {singlePackage.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">{singlePackage.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{singlePackage.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-500" />
                <span>{singlePackage.days} Days</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTag className="text-green-600" />
                <span className="font-bold text-lg text-green-700">
                  ₹{singlePackage.price}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-blue-500" />
                <span className="text-sm">
                  By: {singlePackage.createdBy?.email}
                </span>
              </div>
              <div className="col-span-2">
                <strong>Category:</strong> {singlePackage.category}
              </div>
            </div>

            {/* Highlights */}
            {singlePackage.highlights?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Highlights</h3>
                <ul className="flex flex-wrap gap-2">
                  {singlePackage.highlights.map((point, idx) => (
                    <li
                      key={idx}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => navigate(`/checkout/${singlePackage._id}`)}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              🚀 Book This Package
            </button>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Reviews</h2>
          {singlePackage.reviews?.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="grid gap-6">
              {singlePackage.reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="p-4 border border-gray-200 rounded-xl flex gap-4 items-start shadow-sm hover:shadow-md transition"
                >
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {rev.user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{rev.user?.name}</p>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePackage;
