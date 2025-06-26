import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();


  const {
    tripPackages,
    totalAmount,
    noOfPerson,
    status,
    createdAt,
  } = booking;

  const handleReviewClick = () => {
    navigate(`/review/${tripPackages._id}`, {
      state: {
        packageTitle: tripPackages.title,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200 flex flex-col justify-between">
      {/* Package Image */}
      <img
        src={tripPackages?.images?.[0]?.url || "/default-image.jpg"}
        alt={tripPackages?.title}
        className="w-full h-48 object-cover"
      />

      {/* Details */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {tripPackages?.title}
        </h3>
        <p className="text-gray-600 text-sm">{tripPackages?.location}</p>

        <div className="text-sm text-gray-700 mt-2">
          <p>
            <span className="font-medium">Duration:</span> {tripPackages?.days} days
          </p>
          <p>
            <span className="font-medium">Persons:</span> {noOfPerson}
          </p>
          <p>
            <span className="font-medium">Amount Paid:</span> ₹{totalAmount}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-semibold ${
                status === "success"
                  ? "text-green-600"
                  : status === "failed"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {status}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Booked on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Leave a Review Button */}
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
