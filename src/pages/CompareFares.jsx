import React, { useState } from "react";
import api from "../utils/axiosInstance";
import toast from "react-hot-toast";
import ButtonLoader from "../components/common/ButtonLoader";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Compare Fares</h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="From"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="To"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <select
          name="modeOfTransport"
          value={formData.modeOfTransport}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2"
          required
        >
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="flight">Flight</option>
        </select>

        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading && <ButtonLoader/>}
          {loading ? "Searching..." : "Compare"}
        </button>
      </form>

      {/* Result Section */}
      <div className="max-w-5xl mx-auto mt-10">
        {fares.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fares.map((fare, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow hover:shadow-xl transition-all border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-blue-800 flex justify-between items-center">
                  🚌 {fare.operator}
                  <span className="text-green-600 font-bold text-lg">₹{fare.fare}</span>
                </h3>

                <p className="mt-1 text-gray-700">
                  <span className="font-medium">From:</span> {fare.from} → <span className="font-medium">To:</span>{" "}
                  {fare.to}
                </p>

                <p className="mt-1 text-gray-600">
                  <span className="font-medium">Departure:</span> {fare.departureTime} &nbsp;|&nbsp;
                  <span className="font-medium">Arrival:</span> {fare.arrivalTime}
                </p>

                <p className="mt-1 text-gray-600">
                  <span className="font-medium">Mode:</span> {fare.mode} &nbsp;|&nbsp;
                  <span className="font-medium">Class:</span> {fare.class}
                </p>

                <p className="mt-1 text-gray-500">
                  <span className="font-medium">Duration:</span> {fare.duration}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-gray-500 text-center text-lg mt-6">No fares found for the given route.</p>
          )
        )}
      </div>
    </div>
  );
};

export default CompareFares;
