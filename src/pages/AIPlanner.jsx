import { useState, useRef } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaRoute,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaStar,
  FaDownload,
} from "react-icons/fa";
import html2pdf from "html2pdf.js";

const TripPlanner = () => {
  const [input, setInput] = useState({
    location: "",
    days: "",
    budget: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const resultRef = useRef();

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.location || !input.days || !input.budget || !input.interests)
      return toast.error("Please fill in all the fields!");

    setLoading(true);
    try {
      const res = await api.post("/generate-trip", input);
      setPlan(res.data.data.generatedItinerary);
      toast.success("Trip Plan Ready! ");
    } catch {
      toast.error("Failed to generate trip plan 😓");
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const element = resultRef.current;
    const opt = {
      margin: 0.5,
      filename: "trip-plan.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 via-white to-purple-100 pt-28 pb-20 px-4">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-10">
          ✈️ Plan Your Dream Trip with AI
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {[
            {
              name: "location",
              placeholder: "Where to? (e.g., Goa)",
              icon: FaMapMarkedAlt,
            },
            {
              name: "days",
              placeholder: "Number of Days",
              icon: FaRoute,
              type: "number",
            },
            {
              name: "budget",
              placeholder: "Your Budget (₹)",
              icon: FaMoneyBillWave,
              type: "number",
            },
            {
              name: "interests",
              placeholder: "Your Interests (e.g. beach, heritage)",
              icon: FaStar,
            },
          ].map((field) => (
            <div key={field.name} className="relative">
              <field.icon className="absolute top-3.5 left-4 text-indigo-500 text-lg" />
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={input[field.name]}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 transition shadow-sm"
              />
            </div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300"
          >
            {loading ? "Generating your trip..." : "Generate Trip Plan"}
          </motion.button>
        </form>

        {plan && (
          <motion.div
            ref={resultRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl font-extrabold text-blue-800">
                🗺️ Your AI-Powered Trip Plan
              </h3>
              <button
                onClick={downloadPDF}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition duration-300"
              >
                <FaDownload /> PDF
              </button>
            </div>

            {Object.entries(plan).map(([key, value], idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-gradient-to-br from-sky-50 to-white p-6 rounded-2xl border-l-4 border-blue-400 shadow-md"
              >
                <h4 className="text-xl font-semibold capitalize mb-2 text-indigo-700">
                  {key.replace(/([A-Z])/g, " $1")}
                </h4>
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside text-gray-800 space-y-1 ml-2">
                    {value.map((item, i) => (
                      <li key={i}>✨ {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TripPlanner;