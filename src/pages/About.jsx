import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 mt-10">About Smart Yatra</h1>
      <p className="mb-4 text-lg">
        At <strong>Smart Yatra</strong>, we believe travel should be seamless, smart, and personalized. That’s why we created a platform that empowers travelers to plan trips effortlessly with the help of AI and real-time fare comparison across transportation modes.
      </p>
      <p className="mb-4 text-lg">
        Whether you are traveling solo, with friends, or for business — our platform gives you tools to discover packages, compare prices, and manage your bookings with ease.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Vision</h2>
      <p className="mb-4">
        To become India’s #1 AI-powered travel planner that saves time, money, and hassle for every traveler.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide an intuitive trip planning experience using smart recommendations.</li>
        <li>Integrate fare data from multiple providers — buses, trains, flights.</li>
        <li>Deliver transparency, flexibility, and peace of mind to every user.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Built With Love</h2>
      <p>
        Smart Yatra is developed using the MERN Stack by passionate developers who aim to revolutionize the travel tech industry. We are constantly improving and adding new features based on user feedback.
      </p>
    </div>
  );
};

export default About;

