import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import BookingCard from "../../components/common/BookingCard";
import { motion } from "framer-motion";
import Spinner from "../../components/common/Spinner";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/payment/user");
        setBookings(res.data.data);
      } catch (error) {
        console.log("Failed to fetch bookings");
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <motion.div
      className="min-h-screen pt-24 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        My Bookings
      </h1>

      {loading ? (
        <p className="text-center">
          <Spinner />
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't booked any trips yet.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="w-full"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <BookingCard booking={booking} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyBookings;
