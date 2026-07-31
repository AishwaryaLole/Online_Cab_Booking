import {
  FaMapMarkerAlt,
  FaCar,
  FaUser,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

function CurrentRide({ currentRide }) {
  if (!currentRide) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Current Ride
        </h2>

        <div className="flex flex-col items-center justify-center py-12">
          <FaCar className="text-5xl text-gray-300 mb-4" />

          <p className="text-gray-500">
            No Active Ride Available
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Book a ride to get started.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Current Ride
        </h2>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              currentRide.status === "REQUESTED"
                ? "bg-yellow-100 text-yellow-700"
                : currentRide.status === "IN_PROGRESS"
                ? "bg-blue-100 text-blue-700"
                : currentRide.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
          {currentRide.status}
        </span>
      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-green-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Pickup</p>

            <h4 className="font-semibold">
              {currentRide.pickupLocation}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Drop</p>

            <h4 className="font-semibold">
              {currentRide.dropLocation}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaUser className="text-blue-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Driver</p>

            <h4 className="font-semibold">
             {currentRide.driverId ? `Driver #${currentRide.driverId}` : "Not Assigned Yet"}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaCar className="text-yellow-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Vehicle</p>

            <h4 className="font-semibold">
              {currentRide.driverId ? "Vehicle Details Pending" : "Waiting for Driver"}
            </h4>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

      <button
        disabled={!currentRide.driverId}
        className={`flex justify-center items-center gap-2 py-3 rounded-xl transition-all text-white ${
          currentRide.driverId
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
          <FaPhoneAlt />
          Call Driver
        </button>

          <button
            disabled={currentRide.status === "COMPLETED"}
            className={`py-3 rounded-xl text-white transition-all ${
              currentRide.status === "COMPLETED"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
          Cancel Ride
        </button>

      </div>
    </motion.div>
  );
}

export default CurrentRide;