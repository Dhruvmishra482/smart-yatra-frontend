import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import PackageCard from "../components/common/PackageCard";
import Spinner from "../components/common/Spinner";

const Explore = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/package/getallpackage");
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages", error);
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-700 to-indigo-500 text-transparent bg-clip-text">
        Explore Stunning Travel Packages
      </h1>

      {loading ? (
        <div className="flex justify-center mt-10"><Spinner /></div>
      ) : packages.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No Packages Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              id={pkg._id}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              location={pkg.location}
              duration={pkg.duration}
              images={pkg.images}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
