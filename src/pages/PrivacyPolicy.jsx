import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold text-green-700 mb-6 mt-10">Privacy Policy</h1>

      <p className="mb-4 text-lg">
        At Smart Yatra, we respect your privacy and are committed to protecting your personal information. This privacy policy outlines how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Name, email, phone number (during registration or bookings).</li>
        <li>Location and preferences (for better suggestions).</li>
        <li>Payment info (processed securely via Razorpay).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Data</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>To provide personalized trip planning features.</li>
        <li>To process and manage your bookings.</li>
        <li>To send important service-related communication.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement strong security protocols and encryption to keep your data safe. No payment details are stored on our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Third-Party Sharing</h2>
      <p className="mb-4">
        We do not sell or rent your personal data. We only share with partners for booking fulfilment and only with your consent.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p>
        You may request data deletion or correction anytime by contacting our support team. We honor all GDPR & Indian privacy laws.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
