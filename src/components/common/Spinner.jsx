// src/components/common/Spinner.jsx
import React from "react";

const Spinner = ({ fullScreen = false }) => {
  return (
    <div className={`${fullScreen ? "min-h-screen" : "h-32"} flex items-center justify-center`}>
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
