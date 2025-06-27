// // src/pages/Checkout.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../utils/axiosInstance";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";
// import Spinner from "../components/common/Spinner";
// import ButtonLoader from "../components/common/ButtonLoader";
// import { loadScript } from "../utils/loadRazorpayScript"; // make sure this exists

// const Checkout = () => {
//   const { id: packageId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [tripPackage, setTripPackage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [noOfPersons, setNoOfPersons] = useState(1);
//   const [contactDetails, setContactDetails] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//   });

//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const res = await api.get(`/package/getpackage/${packageId}`);
//         setTripPackage(res.data.data);
//       } catch (err) {
//         toast.error("Package not found");
//         navigate("/explore");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackage();
//   }, [packageId, navigate]);

//   const handleChange = (e) => {
//     setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayment = async () => {
//     if (
//       !contactDetails.name ||
//       !contactDetails.email ||
//       !contactDetails.phone
//     ) {
//       toast.error("Please fill in all contact fields");
//       return;
//     }

//     try {
//       const res = await api.post(`/payment/create-order/${packageId}`, {
//         noOfPersons,
//       });

//       const order = res.data.order;

//       const success = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//       if (!success) {
//         toast.error("Razorpay SDK failed to load");
//         return;
//       }

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Smart Yatra",
//         description: "Trip Booking",
//         image: "/logo.png",
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             const verifyRes = await api.post("/payment/verify", {
//               ...response,
//               noOfPersons,
//               contactDetails,
//               tripPackageId: packageId,
//             });
//             toast.success("Booking Successful!");
//             navigate("/my-bookings");
//           } catch (err) {
//             toast.error("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: contactDetails.name,
//           email: contactDetails.email,
//           contact: contactDetails.phone,
//         },
//         notes: {
//           address: "Smart Yatra Corporate Office",
//         },
//         theme: {
//           color: "#2563eb",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       toast.error("Error initiating payment");
//     }
//   };

//   if (loading)
//     return (
//       <p className="pt-24 text-center">
//         <Spinner />
//       </p>
//     );

//   return (
//     <motion.div
//       className="min-h-screen pt-24 px-4 bg-gradient-to-tr from-white via-blue-50 to-blue-100 flex justify-center items-start"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-4 text-blue-700">Checkout</h2>
//         <img
//           src={tripPackage.thumbnail || tripPackage.images?.[0]?.url}
//           alt={tripPackage.title}
//           className="rounded-md w-full h-48 object-cover mb-4"
//         />
//         <h3 className="text-lg font-semibold">{tripPackage.title}</h3>
//         <p className="text-gray-600 mb-2">{tripPackage.location}</p>
//         <p className="mb-4">₹{tripPackage.price} per person</p>

//         <div className="space-y-3">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={contactDetails.name}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={contactDetails.email}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2"
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={contactDetails.phone}
//             onChange={handleChange}
//             className="w-full border rounded-md px-4 py-2"
//           />
//           <input
//             type="number"
//             name="noOfPersons"
//             value={noOfPersons}
//             onChange={(e) => setNoOfPersons(Number(e.target.value))}
//             min="1"
//             className="w-full border rounded-md px-4 py-2"
//             placeholder="Number of Persons"
//           />

//           <div className="text-right font-medium text-blue-700 mt-2">
//             Total: ₹{tripPackage.price * noOfPersons}
//           </div>

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading && <ButtonLoader />}
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Checkout;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import ButtonLoader from "../components/common/ButtonLoader";

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
    if (
      !contactDetails.name ||
      !contactDetails.email ||
      !contactDetails.phone
    ) {
      toast.error("Please fill in all contact fields");
      return;
    }

    try {
      const res = await api.post(`/payment/create-order/${packageId}`, {
        noOfPersons,
      });

      const order = res.data.order;

      // Create form for Razorpay redirect checkout
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://api.razorpay.com/v1/checkout/embedded";

      const input = (name, value) => {
        const inputEl = document.createElement("input");
        inputEl.type = "hidden";
        inputEl.name = name;
        inputEl.value = value;
        form.appendChild(inputEl);
      };

      input("key_id", import.meta.env.VITE_RAZORPAY_KEY_ID);
      input("order_id", order.id);
      input("prefill[name]", contactDetails.name);
      input("prefill[email]", contactDetails.email);
      input("prefill[contact]", contactDetails.phone);

      document.body.appendChild(form);
      form.submit(); // redirect to Razorpay page
    } catch (error) {
      toast.error("Error initiating payment");
    }
  };

  if (loading)
    return (
      <p className="pt-24 text-center">
        <Spinner />
      </p>
    );

  return (
    <motion.div
      className="min-h-screen pt-24 px-4 bg-gradient-to-tr from-white via-blue-50 to-blue-100 flex justify-center items-start"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Checkout</h2>
        <img
          src={tripPackage.thumbnail || tripPackage.images?.[0]?.url}
          alt={tripPackage.title}
          className="rounded-md w-full h-48 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold">{tripPackage.title}</h3>
        <p className="text-gray-600 mb-2">{tripPackage.location}</p>
        <p className="mb-4">₹{tripPackage.price} per person</p>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contactDetails.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contactDetails.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={contactDetails.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2"
          />
          <input
            type="number"
            name="noOfPersons"
            value={noOfPersons}
            onChange={(e) => setNoOfPersons(Number(e.target.value))}
            min="1"
            className="w-full border rounded-md px-4 py-2"
            placeholder="Number of Persons"
          />

          <div className="text-right font-medium text-blue-700 mt-2">
            Total: ₹{tripPackage.price * noOfPersons}
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <ButtonLoader />}
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
