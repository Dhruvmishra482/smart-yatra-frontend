import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import SoldPackageCard from "../../components/common/SoldPackageCard";
import Spinner from "../../components/common/Spinner"

const SoldPackages = () => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await api.get("/payment/admin");
       
        setPackages(response.data.data);
      } catch (error) {
    
        toast.error("Unable to find packages");
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 mt-20">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        All Booked Packages
      </h2>

      {loading ? (
        <p className="text-center text-gray-600"><Spinner/></p>
      ) : packages.length === 0 ? (
        <p className="text-center text-gray-600">No packages found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <SoldPackageCard key={pkg._id} packages={pkg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldPackages;
