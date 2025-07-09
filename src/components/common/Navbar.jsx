import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, user, isAdmin, isVisitor, logout } = useAuth();

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  // Handle dropdown close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = (path) =>
    `px-3 py-1 rounded-xl transition font-medium ${
      isActive(path)
        ? "bg-blue-100 text-blue-700 font-semibold shadow-inner"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "AI Planner", path: "/ai-planner" },
    { name: "Compare Fares", path: "/compare" },
    { name: "Contact Us", path: "/contact" },
  ];

  const visitorLinks = [
    { name: "My Bookings", path: "/my-bookings" },
    { name: "My Tickets", path: "/my-tickets" },
    { name: "My Details", path: "/my-details" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Create Package", path: "/admin/create-package" },
    { name: "My Packages", path: "/admin/my-packages" },
    { name: "User Queries", path: "/admin/queries" },
    { name: "Sold Packages", path: "/admin/sold-packages" },
    { name: "My Details", path: "/admin/my-details" },
  ];

  return (
    <nav className="bg-slate-200 fixed top-0 left-0 w-full z-50 shadow-sm border-b border-sky-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-blue-600 hover:text-blue-800 transition">
          SmartYatra
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {!isAdmin &&
            commonLinks.map(({ name, path }) => (
              <Link key={name} to={path} className={linkClass(path)}>
                {name}
              </Link>
            ))}

          {!isLoggedIn && (
            <>
              <Link to="/login" className={linkClass("/login")}>Login</Link>
              <Link to="/signup" className={linkClass("/signup")}>Sign Up</Link>
            </>
          )}

          {isLoggedIn && isVisitor && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                <FaUserCircle className="text-xl" />
                Hi, {user?.firstName || "User"}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                  {visitorLinks.map(({ name, path }) => (
                    <Link
                      key={name}
                      to={path}
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition"
                    >
                      {name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <MdLogout /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {isLoggedIn && isAdmin && (
            <>
              {adminLinks.map(({ name, path }) => (
                <Link key={name} to={path} className={linkClass(path)}>
                  {name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white shadow-md flex flex-col items-start">
          {!isAdmin &&
            commonLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={linkClass(path) + " w-full text-left"}
              >
                {name}
              </Link>
            ))}

          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className={linkClass("/login") + " w-full"}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className={linkClass("/signup") + " w-full"}>
                Sign Up
              </Link>
            </>
          )}

          {isLoggedIn && isVisitor && (
            <>
              {visitorLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(path) + " w-full text-left"}
                >
                  {name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-100 rounded-md px-4 py-2 w-full text-left"
              >
                Logout
              </button>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <>
              {adminLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(path) + " w-full text-left"}
                >
                  {name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-100 rounded-md px-4 py-2 w-full text-left"
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
