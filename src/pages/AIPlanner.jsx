import { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaRoute, FaMoneyBillWave, FaMapMarkedAlt, FaStar } from "react-icons/fa";

const TripPlanner = () => {
  const [input, setInput] = useState({ location: "", days: "", budget: "", interests: "" });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.location || !input.days || !input.budget || !input.interests) return toast.error("Fill all fields!");

    setLoading(true);
    try {
      const res = await api.post("/generate-trip", { input });
      setPlan(res.data.data.generatedItinerary);
      toast.success("Trip Plan Ready!");
    } catch {
      toast.error("Couldn't generate trip plan");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-gray-50 py-12 px-4 mt-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🎒 AI Trip Planner</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            { name: "location", placeholder: "Destination (e.g., Goa)", icon: FaMapMarkedAlt },
            { name: "days", placeholder: "Days", icon: FaRoute, type: "number" },
            { name: "budget", placeholder: "Budget (₹)", icon: FaMoneyBillWave, type: "number" },
            { name: "interests", placeholder: "Your Interests", icon: FaStar }
          ].map((field) => (
            <div key={field.name} className="relative">
              <field.icon className="absolute top-3 left-3 text-blue-400" />
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={input[field.name]}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                required
              />
            </div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
          >
            {loading ? "Generating..." : "Generate My Trip Plan"}
          </motion.button>
        </form>

        {plan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">🗺️ Your Trip Plan</h3>
            {Object.entries(plan).map(([key, value], idx) => (
              <div key={idx} className="bg-blue-50 p-5 rounded-xl shadow-inner border-l-4 border-blue-300">
                <h4 className="text-lg font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</h4>
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {value.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                ) : (
                  <p className="text-gray-700">{value}</p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TripPlanner;
