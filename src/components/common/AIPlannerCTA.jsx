import React from "react";
import { Link } from "react-router-dom";

const AIPlannerCTA = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center px-4">
      <h2 className="text-3xl font-bold mb-4">Create your next trip with AI ✨</h2>
      <p className="text-lg mb-6">Just tell us where you want to go — we’ll plan the rest.</p>
      <Link to="/ai-trip" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">Plan My Trip</Link>
    </div>
  );
};

export default AIPlannerCTA;
