import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/video.mp4.mp4" type="video/mp4" />
      </video>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* MAIN TEXT & BUTTONS */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-2xl">
          Plan Smart. <span className="text-yellow-300">Travel Smarter.</span>
        </h1>

        <p className="text-lg sm:text-xl mb-6 max-w-xl drop-shadow-xl">
          AI-Powered Trip Planning & Fare Comparison — All in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/explore"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition drop-shadow-lg"
          >
            🌍 Explore Packages
          </Link>
          <Link
            to="/ai-planner"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition drop-shadow-lg"
          >
            🤖 Plan with AI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
