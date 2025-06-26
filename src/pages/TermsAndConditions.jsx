
import React from 'react'
const TermsAndConditions = () => {
  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold text-red-600 mb-6 mt-10">Terms & Conditions</h1>

      <p className="mb-4 text-lg">
        By accessing and using Smart Yatra, you agree to abide by the following terms and conditions. Please read them carefully before using our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By using our website or services, you agree to these terms. If you disagree with any part, please discontinue use.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. User Responsibilities</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>You must be 18 years or older to use certain features.</li>
        <li>Provide accurate account and booking details.</li>
        <li>Do not attempt unauthorized access or hacking.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Booking and Cancellation</h2>
      <p className="mb-4">
        All bookings are subject to availability and vendor terms. Cancellation policies vary and are shown before you confirm a trip.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Intellectual Property</h2>
      <p className="mb-4">
        All content, branding, and software are property of Smart Yatra. You may not reuse or reproduce them without permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use implies agreement to the latest version.
      </p>
    </div>
  );
};

export default TermsAndConditions;
