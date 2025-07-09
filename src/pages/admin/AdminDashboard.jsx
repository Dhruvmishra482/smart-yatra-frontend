import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import Spinner from "../../components/common/Spinner";
import { FaUsers, FaMoneyBillWave, FaSuitcase, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { format } from "date-fns";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/dashboard-stats");
      setStats(res.data.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      setError("Unable to load dashboard stats");
      toast.error("Failed to fetch admin stats");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/payment/admin");
      setBookings(res.data.data.slice(0, 5)); // Show latest 5 bookings
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      toast.error("Failed to fetch latest bookings");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6 mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
        Admin Dashboard
      </h2>

      {/* STATS BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        <StatBox icon={<FaUsers />} label="Total Users" value={stats.totalUsers} color="text-blue-600" />
        <StatBox icon={<FaSuitcase />} label="Total Packages" value={stats.totalPackages} color="text-green-600" />
        <StatBox icon={<FaMoneyBillWave />} label="Total Revenue" value={`₹${stats.totalRevenue}`} color="text-yellow-600" />
      </div>

      {/* LATEST BOOKINGS */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Latest Bookings</h3>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Trip</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-4 py-2">
                      <p className="font-medium text-gray-800">{booking?.user?.name}</p>
                      <p className="text-sm text-gray-500">{booking?.user?.email}</p>
                    </td>
                    <td className="px-4 py-2">
                      <p className="font-medium text-gray-800">{booking?.tripPackages?.title}</p>
                      <p className="text-sm text-gray-500">{booking?.tripPackages?.location}</p>
                    </td>
                    <td className="px-4 py-2 font-semibold text-green-700">₹{booking.totalAmount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "success"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {format(new Date(booking.createdAt), "dd MMM yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable StatBox component
const StatBox = ({ icon, label, value, color }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-2xl transition duration-300">
    <div className={`text-4xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
