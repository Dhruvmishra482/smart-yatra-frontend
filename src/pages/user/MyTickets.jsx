import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaHourglassHalf } from "react-icons/fa";

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

  const renderStatus = (status) => {
    if (status === "open") {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <FaHourglassHalf /> Open
        </span>
      );
    } else if (status === "closed") {
      return (
        <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
          <FaCheckCircle /> Closed
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
          <FaExclamationCircle /> Pending
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-lg text-gray-600">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] pt-24 pb-10 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
        My Support Tickets
      </h2>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No tickets found.</p>
      ) : (
        <motion.div
          className="grid gap-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {ticket.subject}
                  </h3>
                  <p className="text-gray-700 mt-2">{ticket.description}</p>

                  {ticket.status === "closed" && ticket.resolution && (
                    <div className="mt-3 text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded-md border border-blue-100">
                      <strong>Resolution:</strong> {ticket.resolution}
                    </div>
                  )}

                  <p className="text-sm text-gray-400 mt-3">
                    Created on: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {renderStatus(ticket.status)}

                  {ticket.status === "open" && (
                    <button
                      onClick={() => deleteTicket(ticket._id)}
                      className="mt-1 px-4 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyTickets;
