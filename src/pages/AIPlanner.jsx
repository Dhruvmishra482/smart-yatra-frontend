import React, { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";

const TripPlanner = () => {
  const [inputPreference, setInputPreference] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    interests: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleChange = (e) => {
    setInputPreference({
      ...inputPreference,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !inputPreference.location ||
      !inputPreference.noOfDays ||
      !inputPreference.budget ||
      !inputPreference.interests
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/generate-trip", { inputPreference });
      toast.success("Trip Plan Created!");
      setPlan(res.data.data.generatedItinerary);
    } catch (error) {
      toast.error("Failed to generate trip plan");
     
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          AI Trip Planner
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="location"
            placeholder="Enter destination (e.g., Goa)"
            className="border p-3 rounded-md"
            value={inputPreference.location}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="noOfDays"
            placeholder="Number of Days"
            className="border p-3 rounded-md"
            value={inputPreference.noOfDays}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget (₹)"
            className="border p-3 rounded-md"
            value={inputPreference.budget}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="interests"
            placeholder="Your interests (e.g., beaches, culture)"
            className="border p-3 rounded-md"
            value={inputPreference.interests}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Generating your trip plan..." : "Generate My Trip Plan"}
            </button>
          </div>
        </form>

        {plan && (
          <div className="mt-10 bg-blue-50 p-6 rounded-md border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Your AI-Generated Trip Plan
            </h3>
            <ul className="space-y-2 text-gray-800">
              {Object.entries(plan).map(([key, value], idx) => (
                <li key={idx}>
                  <span className="font-semibold capitalize">{key}:</span>{" "}
                  {Array.isArray(value) ? (
                    <ul className="list-disc list-inside pl-4">
                      {value.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  ) : (
                    value
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
