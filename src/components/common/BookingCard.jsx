import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const {
    tripPackage,
    totalAmount,
    noOfPerson,
    status,
    createdAt,
  } = booking;

  const handleReviewClick = () => {
    navigate(`/review/${tripPackage._id}`, {
      state: {
        packageTitle: tripPackage.title,
      },
    });
  };

  const statusIcon =
    status === "success" ? (
      <FaCheckCircle className="text-green-600" />
    ) : status === "failed" ? (
      <FaTimesCircle className="text-red-500" />
    ) : (
      <FaClock className="text-yellow-500" />
    );

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200 flex flex-col justify-between">
      <img
        src={tripPackage?.images?.[0]?.url || "/default-image.jpg"}
        alt={tripPackage?.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {tripPackage?.title}
          </h3>
          {statusIcon}
        </div>
        <p className="text-gray-600 text-sm">{tripPackage?.location}</p>

        <div className="text-sm text-gray-700 mt-2 space-y-1">
          <p>
            <span className="font-medium">Duration:</span>{" "}
            {tripPackage?.days} Days
          </p>
          <p>
            <span className="font-medium">Travellers:</span> {noOfPerson}
          </p>
          <p>
            <span className="font-medium">Amount Paid:</span> ₹{totalAmount}
          </p>
          <p>
            <span className="font-medium">Booking Date:</span>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {status === "success" && (
          <button
            onClick={handleReviewClick}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition text-sm self-start"
          >
            Leave a Review
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
