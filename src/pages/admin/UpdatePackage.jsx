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

      const response = await api.put(`/package/updatepackage/${id}`, updatedData);
      toast.success(response.data.message);
      navigate("/admin/my-packages");
    } catch (error) {
      toast.error("Failed to update package");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 mt-4 animate-fade-in-up">
          Update Travel Package
        </h2>

        {existingImages.length > 0 && !replaceImages && (
          <div className="mb-6">
            <h4 className="text-lg text-gray-700 font-semibold mb-3">Current Images</h4>
            <div className="grid grid-cols-2 gap-4">
              {existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`existing-${idx}`}
                  className="rounded-lg border shadow object-cover w-full h-40 hover:scale-[1.02] transition duration-300"
                />
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input fields */}
          {[
            { name: "title", type: "text", placeholder: "e.g. Manali Adventure" },
            { name: "description", type: "text", placeholder: "Full description" },
            { name: "location", type: "text", placeholder: "e.g. Manali" },
            { name: "price", type: "number", placeholder: "e.g. 9999" },
            { name: "days", type: "number", placeholder: "e.g. 5" },
            { name: "category", type: "text", placeholder: "Adventure, Spiritual, etc." },
            { name: "highlights", type: "text", placeholder: "Comma separated: Trekking, Rafting" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field.name}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          ))}

          {/* Image Replace Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="replaceImages"
              checked={replaceImages}
              onChange={() => setReplaceImages((prev) => !prev)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="replaceImages" className="text-sm text-gray-700">
              Replace Existing Images
            </label>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-lg hover:file:bg-blue-700 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading && <ButtonLoader />}
            {loading ? "Updating..." : "Update Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackage;
