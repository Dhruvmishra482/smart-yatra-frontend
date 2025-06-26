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
       
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Explore Our Packages
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg"><Spinner/></p>
      ) : packages.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No Packages Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
