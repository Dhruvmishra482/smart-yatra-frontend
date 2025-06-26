import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner"
const MyPackages = () => {
  const [loading, setLoading] = useState(false);
  const [myPackages, setMyPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await api.get("/package/getallpackage");
        setMyPackages(response.data.data);
      } catch (error) {
        toast.error("Unable to retrieve packages");
       
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this package?");
      if (!confirm) return;

      const response = await api.delete(`/package/deletepackage/${id}`);
      toast.success("Package deleted successfully");
      setMyPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (error) {
      toast.error("Failed to delete package");
   
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8 mt-10">My Created Packages</h2>

      {loading ? (
        <p className="text-center text-gray-600"><Spinner/></p>
      ) : myPackages.length === 0 ? (
        <p className="text-center text-gray-500">No packages found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={pkg.images?.[0]?.url || "https://via.placeholder.com/400x200"}
                alt={pkg.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-800">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{pkg.location}</p>
                <p className="text-gray-800 font-semibold">₹{pkg.price}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{pkg.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/admin/update-package/${pkg._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPackages;
