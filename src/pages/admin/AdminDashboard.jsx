import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  FaUsers,
  FaMoneyBillWave,
  FaSuitcase,
  FaCheckCircle,
  FaCommentDots,
  FaSearchLocation,
  FaStar,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
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

  useEffect(() => {
    fetchStats();
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
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        🚀 Admin Dashboard Overview
      </h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        <StatBox icon={<FaUsers />} label="Users" value={stats.totalUsers} color="text-blue-600" />
        <StatBox icon={<FaSuitcase />} label="Packages" value={stats.totalPackages} color="text-green-600" />
        <StatBox icon={<FaMoneyBillWave />} label="Revenue" value={`₹${stats.totalRevenue}`} color="text-yellow-600" />
        <StatBox icon={<FaCheckCircle />} label="Bookings" value={stats.totalBookings} color="text-purple-600" />
        <StatBox icon={<FaCommentDots />} label="Reviews" value={stats.totalReviews} color="text-pink-600" />
        <StatBox icon={<FaSearchLocation />} label="Searches" value={stats.totalSearches} color="text-indigo-600" />
      </div>

      {/* Top Routes */}
      <section className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">🔍 Top Searched Routes</h3>
        <div className="bg-white rounded-xl shadow p-6">
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {stats.topRoutes.map((route, idx) => (
              <li key={idx}>
                {route._id.from} → {route._id.to} &nbsp;
                <span className="text-sm text-gray-500">({route.count} searches)</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Top Rated Packages */}
      <section className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">⭐ Top Rated Packages</h3>
        <div className="bg-white rounded-xl shadow p-6">
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {stats.topRatedPackages.map((pkg, idx) => (
              <li key={idx}>
                Package ID: {pkg._id} —
                <span className="text-yellow-600 font-semibold ml-1">{pkg.avgRating.toFixed(1)}★</span> &nbsp;
                <span className="text-sm text-gray-500">({pkg.totalReviews} reviews)</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">📦 Latest 5 Bookings</h3>
        <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
          <table className="min-w-full text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Trip</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <p className="font-medium">{b.user?.name}</p>
                    <p className="text-sm text-gray-500">{b.user?.email}</p>
                  </td>
                  <td className="px-4 py-2">{b.tripPackage?.title}</td>
                  <td className="px-4 py-2 font-semibold text-green-600">₹{b.totalAmount}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{format(new Date(b.createdAt), "dd MMM yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const StatBox = ({ icon, label, value, color }) => (
  <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition duration-300">
    <div className={`text-4xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;