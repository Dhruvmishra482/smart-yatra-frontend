import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";
import SoldPackageCard from "../../components/common/SoldPackageCard";
import { motion } from "framer-motion";

const SoldPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await api.get("/payment/admin");
        setPackages(response.data.data);
      } catch (error) {
        toast.error("Unable to fetch packages");
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 py-16">
      <motion.h2
        className="text-4xl font-bold text-center text-blue-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        All Booked Packages
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : packages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No packages found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <SoldPackageCard packages={pkg} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SoldPackages;
