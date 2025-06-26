import React from "react";

const features = [
  {
    icon: "✈️",
    title: "Compare Fares",
    description: "Compare flight, train, and bus fares instantly.",
  },
  {
    icon: "🤖",
    title: "AI Trip Planner",
    description: "Let AI create your dream trip in seconds.",
  },
  {
    icon: "📦",
    title: "Expert Packages",
    description: "Handpicked packages curated by our travel team.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Why Choose Smart Yatra?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
