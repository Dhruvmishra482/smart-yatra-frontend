import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import ButtonLoader from "../components/common/ButtonLoader";
import { loadScript } from "../utils/loadRazorpayScript";

const Checkout = () => {
  const { id: packageId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tripPackage, setTripPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noOfPersons, setNoOfPersons] = useState(1);
  const [contactDetails, setContactDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/package/getpackage/${packageId}`);
        setTripPackage(res.data.data);
      } catch (err) {
        toast.error("Package not found");
        navigate("/explore");
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [packageId, navigate]);

  const handleChange = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!contactDetails.name || !contactDetails.email || !contactDetails.phone) {
      toast.error("Please fill in all contact fields");
      return;
    }

    try {
      const res = await api.post(`/payment/create-order/${packageId}`, {
        noOfPersons,
      });

      const order = res.data.order;
      const success = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!success) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Smart Yatra",
        description: "Trip Booking",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            await api.post("/payment/verify", {
              ...response,
              noOfPersons,
              contactDetails,
              tripPackageId: packageId,
            });
            toast.success("Booking Successful!");
            navigate("/my-bookings");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: contactDetails.name,
          email: contactDetails.email,
          contact: contactDetails.phone,
        },
        notes: {
          address: "Smart Yatra Corporate Office",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Error initiating payment");
    }
  };

  if (loading)
    return (
      <div className="pt-24 text-center">
        <Spinner />
      </div>
    );

  return (
    <motion.div
      className="min-h-screen pt-24 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-white to-sky-100"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto rounded-2xl shadow-2xl bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Trip Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex flex-col justify-between">
          <div>
            <img
              src={tripPackage.images?.[0]?.url || "/default.jpg"}
              alt={tripPackage.title}
              className="rounded-lg mb-6 w-full h-56 object-cover shadow-lg border-4 border-white"
            />
            <h2 className="text-3xl font-bold">{tripPackage.title}</h2>
            <p className="mt-2 text-blue-100">{tripPackage.location}</p>
            <p className="mt-1 text-sm text-blue-200 font-medium">
              Duration: <span className="font-semibold">{tripPackage.duration} Days</span>
            </p>
          </div>

          <div className="mt-6 text-2xl font-bold">
            ₹{tripPackage.price}{" "}
            <span className="text-base font-medium">/ person</span>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="p-8 bg-white">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Traveler & Contact Details</h3>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={contactDetails.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={contactDetails.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={contactDetails.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              min="1"
              name="noOfPersons"
              value={noOfPersons}
              onChange={(e) => setNoOfPersons(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Number of Persons"
            />

            <div className="text-right text-blue-600 font-bold text-lg mt-2">
              Total: ₹{tripPackage.price * noOfPersons}
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading && <ButtonLoader />}
              {loading ? "Processing..." : "Pay Now & Book Trip"}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-5">
            * Once payment is successful, booking will be visible in "My Bookings".
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
