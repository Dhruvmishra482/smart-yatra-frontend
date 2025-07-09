import { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ButtonLoader from "../components/common/ButtonLoader";
import { motion } from "framer-motion";
import { FaBus, FaTrain, FaPlane } from "react-icons/fa";

const CompareFares = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    travelDate: "",
    modeOfTransport: "bus",
  });

  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/fare/search", formData);
      setFares(res.data.data);
      toast.success("Fares fetched successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch fares");
    }
    setLoading(false);
  };

  const getIcon = (mode) => {
    if (mode === "bus") return <FaBus className="text-lg mr-2 text-blue-600" />;
    if (mode === "train") return <FaTrain className="text-lg mr-2 text-green-600" />;
    if (mode === "flight") return <FaPlane className="text-lg mr-2 text-purple-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-white to-sky-200 px-4 py-14 mt-14">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Compare Fares
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-xl rounded-2xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          name="from"
          placeholder="From"
          value={formData.from}
          onChange={handleChange}
          className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none"
          required
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none"
          required
        />
        <input
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none"
          required
        />
        <select
          name="modeOfTransport"
          value={formData.modeOfTransport}
          onChange={handleChange}
          className="border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none"
        >
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="flight">Flight</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition flex items-center justify-center gap-2"
        >
          {loading && <ButtonLoader />}
          {loading ? "Searching..." : "Compare Now"}
        </button>
      </motion.form>

      {/* Result Section */}
      <div className="max-w-6xl mx-auto mt-12">
        {fares.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {fares.map((fare, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-xl border border-gray-200 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center font-bold text-lg text-blue-800">
                    {getIcon(fare.mode)} {fare.operator}
                  </div>
                  <div className="text-green-600 text-lg font-semibold">₹{fare.fare}</div>
                </div>

                <p className="text-gray-700 text-sm">
                  <strong>From:</strong> {fare.from} → <strong>To:</strong> {fare.to}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Departure:</strong> {fare.departureTime} | <strong>Arrival:</strong> {fare.arrivalTime}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Class:</strong> {fare.class} | <strong>Duration:</strong> {fare.duration}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && (
            <motion.p
              className="text-center text-gray-500 mt-10 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No fares found for the selected route.
            </motion.p>
          )
        )}
      </div>
    </div>
  );
};

export default CompareFares;
