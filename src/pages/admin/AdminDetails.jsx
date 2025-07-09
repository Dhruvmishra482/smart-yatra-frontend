import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUser, FaEnvelope, FaPhoneAlt, FaIdBadge } from "react-icons/fa";

const AdminDetails = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-200 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-10"
      >
        {/* Avatar and Badge */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.image || "/admin-avatar.png"}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <h2 className="text-2xl font-bold text-blue-700 mt-4">{user?.firstName || "Admin"}</h2>
          <span className="flex items-center mt-1 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full shadow">
            <FaShieldAlt className="mr-2" />
            Admin Account
          </span>
        </div>

        {/* Details Grid */}
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
  <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
    <div className="text-blue-600 text-lg">{icon}</div>
    <div>
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-gray-800 font-semibold break-all">{value}</p>
    </div>
  </div>
);

export default AdminDetails;
