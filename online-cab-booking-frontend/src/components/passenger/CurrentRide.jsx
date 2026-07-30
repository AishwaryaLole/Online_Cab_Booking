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

        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
          {currentRide.status}
        </span>
      </div>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-green-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Pickup</p>

            <h4 className="font-semibold">
              {currentRide.pickup}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-red-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Drop</p>

            <h4 className="font-semibold">
              {currentRide.drop}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaUser className="text-blue-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Driver</p>

            <h4 className="font-semibold">
              {currentRide.driver}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaCar className="text-yellow-600 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Vehicle</p>

            <h4 className="font-semibold">
              {currentRide.vehicle}
            </h4>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <button className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all">
          <FaPhoneAlt />
          Call Driver
        </button>

        <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-all">
          Cancel Ride
        </button>

      </div>
    </motion.div>
  );
}

export default CurrentRide;