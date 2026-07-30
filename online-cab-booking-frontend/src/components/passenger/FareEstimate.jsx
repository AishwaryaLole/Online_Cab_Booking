import { FaCarSide, FaMoneyBillWave, FaClock } from "react-icons/fa";

// Component to display estimated ride details
function FareEstimate({ fare, distance, duration }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

      {/* Card Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Fare Estimate
      </h2>

      {/* Fare Details */}
      <div className="space-y-4">

        {/* Estimated Fare */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-600 text-xl" />
            <span>Estimated Fare</span>
          </div>

          <span className="font-bold text-green-600 text-lg">
            ₹ {fare}
          </span>
        </div>

        {/* Distance */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-3">
            <FaCarSide className="text-blue-600 text-xl" />
            <span>Distance</span>
          </div>

          <span className="font-semibold">
            {distance} km
          </span>
        </div>

        {/* Duration */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaClock className="text-orange-600 text-xl" />
            <span>Estimated Time</span>
          </div>

          <span className="font-semibold">
            {duration} mins
          </span>
        </div>

      </div>

      {/* Confirm Ride Button */}
      <button
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Confirm Ride
      </button>

    </div>
  );
}

export default FareEstimate;