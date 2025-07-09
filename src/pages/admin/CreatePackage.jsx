import React, { useState } from "react";
import api from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ButtonLoader from "../../components/common/ButtonLoader";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaImage,
  FaTag,
  FaRegStickyNote,
  FaMountain,
  FaStar,
} from "react-icons/fa";

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      setLoading(false);
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
      toast.error(error.response?.data?.message || "Failed to create package");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
          <FaMountain className="text-blue-500" /> Create a Travel Package
        </h2>

        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaTag /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Manali Adventure"
              className="input-style"
              required
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Manali"
              className="input-style"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaRupeeSign /> Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 12000"
              className="input-style"
              required
            />
          </div>

          {/* Days */}
          <div className="flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaCalendarAlt /> Duration (Days)
            </label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              placeholder="e.g. 4"
              className="input-style"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaStar /> Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-style bg-white"
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

          {/* Highlights */}
          <div className="flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaStar /> Highlights
            </label>
            <input
              type="text"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="e.g. River Rafting, Snow Trek"
              className="input-style"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaRegStickyNote /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter full description..."
              className="input-style resize-none"
              required
            ></textarea>
          </div>

          {/* Images */}
          <div className="md:col-span-2 flex flex-col">
            <label className="mb-1 flex items-center gap-2 text-gray-700 font-medium">
              <FaImage /> Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <ButtonLoader />}
              {loading ? "Creating..." : "Create Package"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePackage;
