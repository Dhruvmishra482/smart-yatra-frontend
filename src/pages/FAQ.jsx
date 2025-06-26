import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "How does the AI trip planner work?",
    answer: "It analyzes your preferences like budget, time, destination, and recommends an optimized trip plan.",
  },
  {
    question: "Can I compare bus, train, and flight fares together?",
    answer: "Yes. Smart Yatra shows fare comparison from multiple transport providers side by side.",
  },
  {
    question: "Is Smart Yatra free?",
    answer: "Yes, most features are free. Premium planning options are available for advanced users.",
  },
  {
    question: "Can I save and edit my trip plans?",
    answer: "Yes, registered users can save, modify, and share their trip plans anytime.",
  },
  {
    question: "Does Smart Yatra offer real-time fare updates?",
    answer: "Yes, we pull real-time fare info from providers and refresh frequently.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use secure encryption and never sell your personal data.",
  },
  {
    question: "How do I contact support?",
    answer: "You can use the Contact page or raise a ticket in your dashboard.",
  },
  {
    question: "Can I cancel a booked trip?",
    answer: "Yes, based on cancellation policies. Details are shown before you book.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support UPI, Netbanking, Credit/Debit cards via Razorpay.",
  },
  {
    question: "Do you offer travel insurance?",
    answer: "Currently no, but it's on our roadmap!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <FaQuestionCircle className="mx-auto text-4xl text-purple-600 mb-2 mt-10" />
        <h2 className="text-4xl font-bold text-gray-800">Frequently Asked Questions </h2>
        <p className="text-gray-500 mt-2">Everything you need to know before planning your journey</p>
      </div>

      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm transition duration-300 hover:shadow-md"
          >
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center text-gray-800 font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-purple-600" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
