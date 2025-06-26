import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Smart Yatra</h3>
          <p className="text-sm text-gray-300">
            Your smart travel companion. Plan trips, compare fares, and explore curated packages — all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/explore" className="hover:text-white transition">Packages</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/my-tickets" className="hover:text-white transition">My Tickets</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-300">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-300">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-300">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-400">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-blue-600 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Smart Yatra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
