import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import Spinner from "../../components/common/Spinner";

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

      const res = await api.put(`/ticket/${ticketId}/status`, {
        status,
        resolution,
      });

      toast.success("Ticket updated successfully");
      setEditingTicketId(null);
      setForm({ status: "", resolution: "" });
      fetchQueries();
    } catch (err) {
      toast.error("Failed to update ticket");
    
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 mt-20">
        User Queries
      </h1>

      {loading ? (
        <p className="text-center text-gray-600"><Spinner/></p>
      ) : queries.length === 0 ? (
        <p className="text-center text-gray-500">No user queries found.</p>
      ) : (
        <div className="grid gap-6">
          {queries.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white shadow-md rounded-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {ticket.subject}
                  </h3>
                  <p className="text-gray-700 mt-1">{ticket.description}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium capitalize h-fit ${
                    statusColors[ticket.status]
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              {ticket.resolution && (
                <div className="mt-2 bg-green-50 border border-green-200 p-3 rounded-md">
                  <p className="text-sm text-green-800">
                    <strong>Resolution:</strong> {ticket.resolution}
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>

              <button
                className="mt-4 text-sm text-blue-600 underline"
                onClick={() => handleEditClick(ticket)}
              >
                Update Status
              </button>

              {editingTicketId === ticket._id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border px-3 py-2 rounded-md mb-2"
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
                    Resolution (Optional unless closing)
                  </label>
                  <textarea
                    rows="2"
                    className="w-full border px-3 py-2 rounded-md"
                    value={form.resolution}
                    onChange={(e) =>
                      setForm({ ...form, resolution: e.target.value })
                    }
                  />

                  <div className="flex gap-4 mt-3">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => handleUpdate(ticket._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                      onClick={() => {
                        setEditingTicketId(null);
                        setForm({ status: "", resolution: "" });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Userqueries;
