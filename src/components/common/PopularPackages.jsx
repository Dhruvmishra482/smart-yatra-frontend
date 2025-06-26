import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../utils/axiosInstance'

const PopularPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/package/getallpackage");
      setPackages(res.data.data.slice(0, 3));
    };
    fetch();
  }, []);

  return (
    <div className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Popular Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {packages.map(pkg => (
          <div key={pkg._id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
            <img src={pkg?.images?.[0]?.url } alt={pkg.name} className="w-full h-48 object-cover rounded-md" loading="lazy" />
            <h3 className="mt-3 text-lg font-semibold text-blue-800">{pkg.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
            <p className="text-blue-600 font-bold mb-2">₹{pkg.price}</p>
            <Link to={`/package/${pkg._id}`} className="text-blue-500 hover:underline">View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPackages;
