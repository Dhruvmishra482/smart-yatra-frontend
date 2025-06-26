import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { motion } from "framer-motion";
import Spinner from "../components/common/Spinner";
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
      
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg mt-20"><Spinner/></p>;
  }

  if (!singlePackage) {
    return <p className="text-center text-lg mt-20 text-red-500">Package not found.</p>;
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10"
        >
          {/* Left: Image */}
          <div className="lg:w-1/2">
            <img
              src={singlePackage.images?.[0]?.url}
              alt={singlePackage.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              {singlePackage.title}
            </h1>
            <p className="text-gray-700 mb-4">{singlePackage.description}</p>

            <p className="mb-2 text-gray-600">
              <strong>Location:</strong> {singlePackage.location}
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Days:</strong> {singlePackage.days}
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Price:</strong> ₹{singlePackage.price}
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Category:</strong> {singlePackage.category}
            </p>
            <p className="mb-2 text-gray-600">
              <strong>Created By:</strong> {singlePackage.createdBy?.email}
            </p>

            {singlePackage.highlights?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Highlights</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {JSON.parse(singlePackage.highlights[0]).map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => navigate(`/checkout/${singlePackage._id}`)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md shadow"
            >
              Book Now
            </button>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {singlePackage.reviews.length === 0 ? (
            <p className="text-gray-500">No one has reviewed this package yet.</p>
          ) : (
            <div className="space-y-4">
              {singlePackage.reviews.map((rev) => (
                <div key={rev._id} className="bg-white p-4 shadow rounded">
                  <p className="font-semibold">{rev.user?.name}</p>
                  <p className="text-gray-600">{rev.review}</p>
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
