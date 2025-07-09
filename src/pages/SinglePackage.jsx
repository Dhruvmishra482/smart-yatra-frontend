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

  if (loading) return <div className="mt-20"><Spinner /></div>;

  if (!singlePackage)
    return (
      <p className="text-center text-lg mt-20 text-red-500">
        Package not found.
      </p>
    );

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-blue-50 via-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-xl shadow-lg"
        >
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src={singlePackage.images?.[0]?.url || "/default.jpg"}
              alt={singlePackage.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Package Info */}
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {singlePackage.title}
            </h1>
            <p className="text-gray-600">{singlePackage.description}</p>

            <div className="space-y-2 text-sm text-gray-700 mt-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>{singlePackage.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-600" />
                <span>{singlePackage.days} Days</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTag className="text-green-600" />
                <span className="text-lg font-bold text-green-700">
                  ₹{singlePackage.price}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-gray-600" />
                <span className="text-sm">
                  Created by: {singlePackage.createdBy?.email}
                </span>
              </div>
              <p>
                <strong>Category:</strong> {singlePackage.category}
              </p>
            </div>

            {/* Highlights */}
            {singlePackage.highlights?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mt-4 mb-2">Highlights</h3>
                <ul className="flex flex-wrap gap-2">
                  {JSON.parse(singlePackage.highlights[0]).map((point, idx) => (
                    <li
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => navigate(`/checkout/${singlePackage._id}`)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg shadow-md"
            >
              Book This Package
            </button>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h2>
          {singlePackage.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {singlePackage.reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {rev.user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {rev.user?.name}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {rev.review}
                    </p>
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
