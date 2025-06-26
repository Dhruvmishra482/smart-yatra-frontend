import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import Spinner from "../../components/common/Spinner";

const MyTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets/user");
        setTickets(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch tickets");
      
      }
      setLoading(false);
    };

    fetchTickets();
  }, []);

  const deleteTicket = async (ticketId) => {
    try {
      const res = await api.delete(`/ticket/${ticketId}`);
      toast.success(res.data.message);
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
    } catch (error) {
      toast.error("Failed to delete ticket");
   
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-lg text-gray-600">
      <Spinner/>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-[80px] pb-8 min-h-[calc(100vh-80px)]">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Support Tickets
      </h2>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid gap-5">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {ticket.subject}
                  </h3>
                  <p className="text-gray-700 mt-2">{ticket.description}</p>

                  {ticket.status === "closed" && ticket.resolution && (
                    <div className="mt-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
                      <strong>Resolution:</strong> {ticket.resolution}
                    </div>
                  )}

                  <p className="text-sm text-gray-400 mt-2">
                    Created at: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${
                      ticket.status === "open"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "closed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ticket.status}
                  </span>

                  {ticket.status === "open" && (
                    <button
                      onClick={() => deleteTicket(ticket._id)}
                      className="mt-1 px-4 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
