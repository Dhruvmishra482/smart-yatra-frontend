import React from "react";

const steps = [
  { step: "1", title: "Sign Up", desc: "Create your free account." },
  { step: "2", title: "Choose", desc: "Pick a package or plan using AI." },
  { step: "3", title: "Book", desc: "Secure payment and travel stress-free." },
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">How It Works</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {steps.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl font-bold text-blue-500 mb-2">{s.step}</div>
            <h3 className="text-xl font-semibold text-gray-800">{s.title}</h3>
            <p className="text-gray-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
