import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 🧠 Very important: Register plugin once
gsap.registerPlugin(ScrollTrigger);


const HeroSection = () => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(textRef.current, { y: 50, opacity: 0, duration: 1.2 });
    gsap.from(buttonRef.current, { y: 60, opacity: 0, duration: 1.2, delay: 0.4 });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/videos/travel.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-blue-800/60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 ref={textRef} className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          Plan Smart. <span className="text-yellow-300">Travel Smarter.</span>
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-xl">
          AI-Powered Trip Planning & Fare Comparison — All in one place.
        </p>

        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/explore" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">🌍 Explore Packages</Link>
          <Link to="/ai-trip" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">🤖 Plan with AI</Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
