import React from "react";

const SoldPackageCard = ({ packages}) => {
  const {
    tripPackages,
    user,
    contactDetails,
    noOfPerson,
    totalAmount,
    status,
    orderId,
    createdAt,
  } = packages;

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 border hover:shadow-xl transition">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">
        {tripPackages?.title}
      </h3>
      {/* <p className="text-gray-700 mb-1">
        <strong>Location:</strong> {tripPackages?.location}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Price Per Person:</strong> ₹{tripPackages?.price}
      </p> */}
      <p className="text-gray-700 mb-1">
        <strong>No. of Persons:</strong> {noOfPerson}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Total Amount:</strong> ₹{totalAmount}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Status:</strong>{" "}
        <span
          className={`px-2 py-0.5 rounded text-white text-sm ${
            status === "success"
              ? "bg-green-600"
              : status === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </p>
      <hr className="my-3" />
      <div className="text-sm text-gray-600">
        <p>
          <strong>Customer:</strong> {contactDetails?.name} (
          {user?.email})
        </p>
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Date:</strong> {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SoldPackageCard;