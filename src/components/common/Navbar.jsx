import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, user, isAdmin, isVisitor, logout } = useAuth();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "AI Planner", path: "/ai-planner" },
    { name: "Compare Fares", path: "/compare" },
    { name: "Contact Us", path: "/contact" },
  ];

  const userLinks = [
    { name: "My Bookings", path: "/my-bookings" },
    { name: "My Tickets", path: "/my-tickets" },
  ];

  const adminLinks = [
    { name: "Create Package", path: "/admin/create-package" },
    { name: "My Packages", path: "/admin/my-packages" },
    { name: "User Queries", path: "/admin/queries" },
    { name: "Sold Packages", path: "/admin/sold-packages" },
  ];

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600 hover:text-blue-800 transition"
        >
          SmartYatra
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {!isAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.name}
              </Link>
            ))}

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && isVisitor && (
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                My Profile
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 right-0 w-44 z-10">
                {userLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {isLoggedIn && isAdmin && (
            <div className="flex items-center gap-4">
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white shadow-md">
          {!isAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && isVisitor && (
            <>
              {userLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 transition"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <>
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 transition"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
