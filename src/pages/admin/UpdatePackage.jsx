import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import ButtonLoader from "../../components/common/ButtonLoader";

const UpdatePackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [replaceImages, setReplaceImages] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    days: "",
    category: "",
    highlights: "",
    images: null,
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/package/getpackage/${id}`);
        const data = res.data.data;

        setFormData({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          price: data.price || "",
          days: data.days || "",
          category: data.category || "",
          highlights: data.highlights?.join(", ") || "",
          images: null,
        });
        setExistingImages(data.images || []);
      } catch {
        toast.error("Failed to load package data");
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images" && value) {
          Array.from(value).forEach((file) => data.append("images", file));
        } else {
          data.append(key, value);
        }
      });
      data.append("replaceImages", replaceImages);

      const res = await api.put(`/package/updatepackage/${id}`, data);
      toast.success(res.data.message);
      navigate("/admin/my-packages");
    } catch {
      toast.error("Failed to update package");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Update Travel Package
        </h2>

        {/* Show Existing Images */}
        {!replaceImages && existingImages.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Current Images</h4>
            <div className="grid grid-cols-2 gap-4">
              {existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`preview-${idx}`}
                  className="w-full h-40 rounded-lg object-cover shadow hover:scale-[1.03] transition"
                />
              ))}
            </div>
          </div>
        )}

        {/* Form Starts */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fields */}
          {[
            { name: "title", label: "Title", type: "text", placeholder: "e.g. Kashmir Retreat" },
            { name: "location", label: "Location", type: "text", placeholder: "e.g. Srinagar" },
            { name: "price", label: "Price", type: "number", placeholder: "e.g. 15000" },
            { name: "days", label: "Days", type: "number", placeholder: "e.g. 4" },
            { name: "category", label: "Category", type: "text", placeholder: "Adventure, Spiritual..." },
            { name: "highlights", label: "Highlights", type: "text", placeholder: "Comma separated" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm text-gray-700 mb-1 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="input-style"
              />
            </div>
          ))}

          {/* Description (full row) */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="input-style resize-none"
              placeholder="Write a detailed description..."
              required
            />
          </div>

          {/* Replace Image Checkbox (full row) */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="replace"
              checked={replaceImages}
              onChange={() => setReplaceImages(!replaceImages)}
              className="accent-blue-600 w-4 h-4"
            />
            <label htmlFor="replace" className="text-sm text-gray-700">
              Replace Existing Images
            </label>
          </div>

          {/* File Upload (full row) */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-1 font-medium">Upload New Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full file:bg-blue-600 file:text-white file:py-2 file:px-4 file:rounded-lg hover:file:bg-blue-700 transition text-sm"
            />
          </div>

          {/* Submit (full row) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading && <ButtonLoader />}
              {loading ? "Updating..." : "Update Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackage;
