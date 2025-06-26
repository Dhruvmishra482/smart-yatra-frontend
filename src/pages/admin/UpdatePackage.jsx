import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import ButtonLoader from "../../components/common/ButtonLoader";

const UpdatePackage = () => {
  const { id } = useParams(); // Package ID from URL
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
    images: null, // new images
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await api.get(`/package/getpackage/${id}`);
        const data = response.data.data;
        setFormData({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          price: data.price || "",
          days: data.days || "",
          category: data.category || "",
          highlights: data.highlights.join(", ") || "",
        });
        setExistingImages(data.images || []);
      } catch (error) {
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
      const updatedData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images" && value) {
          Array.from(value).forEach((file) => {
            updatedData.append("images", file);
          });
        } else {
          updatedData.append(key, value);
        }
      });

      updatedData.append("replaceImages", replaceImages);

      const response = await api.put(
        `/package/updatepackage/${id}`,
        updatedData
      );

      toast.success(response.data.message);
      navigate("/admin/my-packages");
    } catch (error) {
   
      toast.error("Failed to update package");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 mt-10">Update Package</h2>

        {existingImages.length > 0 && !replaceImages && (
          <div className="mb-6">
            <h4 className="text-gray-600 font-medium mb-2">Existing Images:</h4>
            <div className="grid grid-cols-2 gap-4">
              {existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`existing-${idx}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "title", type: "text" },
            { name: "description", type: "text" },
            { name: "location", type: "text" },
            { name: "price", type: "number" },
            { name: "days", type: "number" },
            { name: "category", type: "text" },
            { name: "highlights", type: "text", placeholder: "Comma separated" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder || `Enter ${field.name}`}
              required
              className="w-full px-4 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="replaceImages"
              checked={replaceImages}
              onChange={() => setReplaceImages((prev) => !prev)}
              className="w-4 h-4"
            />
            <label htmlFor="replaceImages" className="text-gray-600">
              Replace existing images
            </label>
          </div>

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {loading && <ButtonLoader/>}
            {loading ? "Updating..." : "Update Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackage;
