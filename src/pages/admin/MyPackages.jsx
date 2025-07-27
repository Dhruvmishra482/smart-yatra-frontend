import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const MyPackages = () => {
  const [loading, setLoading] = useState(false);
  const [myPackages, setMyPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await api.get("/package/getallpackage");
        setMyPackages(response.data.data);
      } catch (error) {
        toast.error("Unable to retrieve packages");
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/package/deletepackage/${id}`);
      toast.success("Package deleted successfully");
      setMyPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-blue-800 mb-12"
      >
        📦 My Created Packages
      </motion.h2>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : myPackages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No packages found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {myPackages.map((pkg) => (
            <motion.div
              key={pkg._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="rounded-xl overflow-hidden shadow-xl relative border border-white/40 backdrop-blur-lg bg-white/80 hover:shadow-2xl transition duration-300"
            >
              <div className="relative group">
                <img
                  src={pkg.images?.[0]?.url || "https://via.placeholder.com/400x200"}
                  alt={pkg.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300"></div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-blue-800">{pkg.title}</h3>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <FaMapMarkerAlt className="text-blue-600" /> {pkg.location}
                </p>
                <p className="text-gray-700 font-medium flex items-center gap-1">
                  <FaRupeeSign className="text-green-600" /> {pkg.price}
                </p>
                <p className="text-gray-500 text-sm line-clamp-3">{pkg.description}</p>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/admin/update-package/${pkg._id}`}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyPackages;
