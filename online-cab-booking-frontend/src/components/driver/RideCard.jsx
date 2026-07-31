import React from "react";

const RideCard = ({ ride }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "ONGOING":
        return "bg-blue-100 text-blue-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {ride.passengerName}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            📍 Pickup: {ride.pickupLocation}
          </p>

          <p className="text-gray-500 text-sm">
            🏁 Drop: {ride.dropLocation}
          </p>

          <p className="text-gray-500 text-sm">
            📏 Distance: {ride.distance} km
          </p>

          <p className="text-gray-500 text-sm">
            🕒 {ride.date}
          </p>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold text-green-600">
            ₹{ride.fare}
          </h2>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              ride.status
            )}`}
          >
            {ride.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
