import React from "react";
import { FaUser, FaEnvelope, FaRupeeSign, FaCalendarAlt, FaHashtag, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const SoldPackageCard = ({ packages }) => {
  const {
    tripPackages,
    user,
    contactDetails,
    noOfPerson,
    totalAmount,
    status,
    orderId,
    createdAt,
  } = packages;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl"
    >
      {/* Package Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-800 mb-1">{tripPackages?.title}</h3>
        <p className="text-sm text-gray-500">{tripPackages?.location}</p>
      </div>

      {/* Booking Info */}
      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p className="flex items-center gap-2">
          <FaHashtag className="text-blue-500" /> <span>Order ID:</span> <strong>{orderId}</strong>
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-blue-500" /> <span>Customer:</span> <strong>{contactDetails?.name}</strong>
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-500" /> <span>Email:</span> <strong>{user?.email}</strong>
        </p>
        <p className="flex items-center gap-2">
          <FaRupeeSign className="text-green-600" /> <span>Total:</span> <strong>₹{totalAmount}</strong>
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-yellow-500" /> <span>Date:</span>{" "}
          <strong>{new Date(createdAt).toLocaleDateString()}</strong>
        </p>
        <p className="flex items-center gap-2">
          <FaCheckCircle className="text-gray-500" /> <span>Persons:</span> <strong>{noOfPerson}</strong>
        </p>
      </div>

      {/* Status Badge */}
      <div className="mt-3">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
};

export default SoldPackageCard;
