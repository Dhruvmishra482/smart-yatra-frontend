import { useState, useRef } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ButtonLoader from "../components/common/ButtonLoader";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import { FaBus, FaTrain, FaPlane } from "react-icons/fa";

const CompareFares = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    travelDate: "",
    modeOfTransport: "",
  });

  const [fares, setFares] = useState([]);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.travelDate) {
      toast.error("Fill all required fields");
      return;
    }

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

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    html2pdf().from(element).set({
      margin: 0.5,
      filename: `fares_${formData.from}_to_${formData.to}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }).save();
  };

  const getIcon = (mode) => {
    if (mode === "bus") return <FaBus className="text-blue-600 mr-1" />;
    if (mode === "train") return <FaTrain className="text-green-600 mr-1" />;
    if (mode === "flight") return <FaPlane className="text-purple-600 mr-1" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 px-4 py-14 mt-14">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✈️ Compare Fares Across All Modes
      </motion.h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
      >
        <input
          type="text"
          name="from"
          placeholder="From (City)"
          value={formData.from}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="to"
          placeholder="To (City)"
          value={formData.to}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
          required
        />
        <select
          name="modeOfTransport"
          value={formData.modeOfTransport}
          onChange={handleChange}
          className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Modes</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="flight">Flight</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading && <ButtonLoader />}
          {loading ? "Comparing..." : "Compare Fares"}
        </button>
      </form>

      {/* Result Section */}
      <div className="max-w-6xl mx-auto mt-12 relative">
        {fares.length > 0 && (
          <div className="flex justify-end mb-6">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow"
            >
              📄 Download as PDF
            </button>
          </div>
        )}

        <div ref={pdfRef}>
          {fares.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {fares.map((fare, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-xl border border-gray-200 rounded-xl p-5 transition-all hover:shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1 font-semibold text-blue-800">
                      {getIcon(fare.mode)}
                      {fare.operator}
                    </div>
                    <span className="text-green-600 font-bold text-lg">
                      ₹{fare.fare}
                    </span>
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
                </div>
              ))}
            </motion.div>
          ) : (
            !loading && (
              <motion.p
                className="text-center text-gray-600 mt-10 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                No fares found for your selected route or mode.
              </motion.p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareFares;
