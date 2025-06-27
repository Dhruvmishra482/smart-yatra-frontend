import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import LogIn from "./pages/LogIn";

import Explore from "./pages/Explore";
import AIPlanner from "./pages/AIPlanner";
import CompareFares from "./pages/CompareFares";
// import RaiseATicket from "./pages/user/RaiseATicket";
import MyBookings from "./pages/user/MyBookings";
import MyTickets from "./pages/user/MyTickets";
import CreatePackage from "./pages/admin/CreatePackage";
import MyPackages from "./pages/admin/MyPackages";
import UserQueries from "./pages/admin/UserQueries";
import SoldPackages from "./pages/admin/SoldPackages";
import ProtectedRoute from "./components/common/core/auth/ProtectedRoutes";
import Navbar from "./components/common/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import ContactUs from "./pages/user/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Checkout from "./pages/Checkout";
import SinglePackage from "./pages/SinglePackage";
import UpdatePackage from "./pages/admin/UpdatePackage";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/ai-planner" element={<AIPlanner />} />
        <Route path="/compare" element={<CompareFares />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/about" element={<About />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />


        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "visitor"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/package/:id" element={<SinglePackage />} />

        {/* User Routes - Protected */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={["visitor"]}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <ProtectedRoute allowedRoles={["visitor"]}>
              <MyTickets />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin/create-package"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreatePackage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/my-packages"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MyPackages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/queries"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserQueries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-package/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UpdatePackage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sold-packages"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SoldPackages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
