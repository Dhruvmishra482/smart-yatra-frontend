import React from "react";

const testimonials = [
  { name: "Rahul S.", review: "Smart Yatra helped me save money and time. AI planner is 🔥" },
  { name: "Priya D.", review: "Super easy to book and compare. The best travel experience!" },
  { name: "Arjun M.", review: "Loved the custom trip suggestions. Highly recommended!" },
];

const TestimonialsSection = () => {
  return (
    <div className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <p className="text-gray-700 italic">“{t.review}”</p>
            <p className="mt-4 font-semibold text-blue-700">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
