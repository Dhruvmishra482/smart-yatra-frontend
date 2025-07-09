import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const statusColors = {
  open: "text-yellow-600 bg-yellow-100",
  inprogress: "text-blue-600 bg-blue-100",
  closed: "text-green-600 bg-green-100",
};

const allowedStatuses = ["open", "inprogress", "closed"];

const Userqueries = () => {
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState([]);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [form, setForm] = useState({ status: "", resolution: "" });

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const response = await api.get("/tickets");
      setQueries(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch tickets");
    }
    setLoading(false);
  };

  const handleEditClick = (ticket) => {
    setEditingTicketId(ticket._id);
    setForm({
      status: ticket.status || "",
      resolution: ticket.resolution || "",
    });
  };

  const handleUpdate = async (ticketId) => {
    try {
      const { status, resolution } = form;

      if (!allowedStatuses.includes(status)) {
        toast.error("Invalid status selected.");
        return;
      }

      if (status === "closed" && !resolution.trim()) {
        toast.error("Resolution is required when closing a ticket.");
        return;
      }

      await api.put(`/ticket/${ticketId}/status`, { status, resolution });

      toast.success("Ticket updated successfully");
      setEditingTicketId(null);
      setForm({ status: "", resolution: "" });
      fetchQueries();
    } catch (err) {
      toast.error("Failed to update ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 py-14 mt-10">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center text-blue-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Queries
      </motion.h1>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : queries.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No user queries found.</p>
      ) : (
        <motion.div
          className="grid gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {queries.map((ticket) => (
            <motion.div
              key={ticket._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-xl shadow-md hover:shadow-lg p-6 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {ticket.subject}
                  </h3>
                  <p className="text-gray-700 mt-1">{ticket.description}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium capitalize h-fit ${statusColors[ticket.status]}`}
                >
                  {ticket.status}
                </span>
              </div>

              {ticket.resolution && (
                <div className="mt-3 bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-800">
                  <strong>Resolution:</strong> {ticket.resolution}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>

              <button
                className="mt-4 text-sm text-blue-600 hover:underline flex items-center gap-1"
                onClick={() => handleEditClick(ticket)}
              >
                <FaEdit className="text-sm" /> Update Status
              </button>

              {editingTicketId === ticket._id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border px-3 py-2 rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="">Select Status</option>
                    {allowedStatuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resolution (Required when closing)
                  </label>
                  <textarea
                    rows="2"
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={form.resolution}
                    onChange={(e) =>
                      setForm({ ...form, resolution: e.target.value })
                    }
                  />

                  <div className="flex gap-4 mt-4">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                      onClick={() => handleUpdate(ticket._id)}
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded flex items-center gap-2 text-sm"
                      onClick={() => {
                        setEditingTicketId(null);
                        setForm({ status: "", resolution: "" });
                      }}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Userqueries;
