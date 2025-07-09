import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const MyDetails = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          My Profile Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <DetailItem label="First Name" value={user?.firstName || "-"} />
          <DetailItem label="Last Name" value={user?.lastName || "-"} />
          <DetailItem label="Email" value={user?.email || "-"} />
          <DetailItem label="Mobile Number" value={user?.mobileNumber || "-"} />
          <DetailItem label="Account Type" value={user?.role || "-"} />
          <DetailItem label="User ID" value={user?.id || "-"} />
        </div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
    <p className="text-gray-500 font-medium mb-1">{label}</p>
    <p className="text-gray-800 font-semibold break-all">{value}</p>
  </div>
);

export default MyDetails;
