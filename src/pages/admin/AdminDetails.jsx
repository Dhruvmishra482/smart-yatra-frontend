import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUser, FaEnvelope, FaPhoneAlt, FaIdBadge } from "react-icons/fa";

const AdminDetails = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-slate-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-10"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
            Welcome, {user?.firstName || "Admin"} 👋
          </h2>
          <p className="text-sm text-gray-500 max-w-md">
            This is your Admin Profile. You have full control over user activity, trip packages, and all data.
          </p>

          <span className="mt-4 px-4 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full shadow flex items-center gap-2">
            <FaShieldAlt /> Admin Account
          </span>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <AdminItem icon={<FaUser />} label="Name" value={`${user?.firstName || "-"} ${user?.lastName || ""}`} />
          <AdminItem icon={<FaEnvelope />} label="Email" value={user?.email || "-"} />
          <AdminItem icon={<FaPhoneAlt />} label="Mobile" value={user?.mobileNumber || "-"} />
          <AdminItem icon={<FaIdBadge />} label="Admin ID" value={user?.id || "-"} />
        </div>
      </motion.div>
    </div>
  );
};

const AdminItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300">
    <div className="text-blue-600 text-xl mt-1">{icon}</div>
    <div>
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-gray-800 font-semibold break-all text-base">{value}</p>
    </div>
  </div>
);

export default AdminDetails;
