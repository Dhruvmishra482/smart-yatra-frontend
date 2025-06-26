import React, { useState } from "react";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
const [loading, setLoading] = useState(false);

const CreatePackage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    days: "",
    category: "",
    highlights: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const res = await api.post("/package/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        days: "",
        category: "",
        highlights: "",
      });
      setImages([]);
     
    } catch (error) {
      
      toast.error(
        error.response?.data?.message || "Failed to create package"
      );
    }
     setLoading(false)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Create a New Travel Package</h2>
      <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Manali Adventure"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Manali"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 10000"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="e.g. 5"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="Adventure">Adventure</option>
            <option value="Leisure">Leisure</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Family">Family</option>
            <option value="Solo">Solo</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
          <input
            type="text"
            name="highlights"
            value={formData.highlights}
            onChange={handleChange}
            placeholder="e.g. River Rafting, Snow Trek"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter full description"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <div className="md:col-span-2 flex justify-center">
  <button
    type="submit"
    disabled={loading}
    className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading && <ButtonLoader />}
    {loading ? "Creating..." : "Create Package"}
  </button>
</div>
      </form>
    </div>
  );
};

export default CreatePackage;
