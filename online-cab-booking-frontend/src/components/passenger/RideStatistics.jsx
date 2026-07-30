import { motion } from "framer-motion";

function RideStatistics({ total, completed, cancelled }) {
  const completionRate =
    total > 0 ? ((completed / total) * 100).toFixed(0) : 0;

  const cancelRate =
    total > 0 ? ((cancelled / total) * 100).toFixed(0) : 0;

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Ride Statistics
      </h2>

      {/* Completed */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Completed</span>
          <span className="font-semibold">{completionRate}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 rounded-full bg-green-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Cancelled */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Cancelled</span>
          <span className="font-semibold">{cancelRate}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 rounded-full bg-red-500"
            style={{ width: `${cancelRate}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-sm">Total Rides</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {total}
          </h3>
        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-sm">Completed</p>
          <h3 className="text-2xl font-bold text-green-600">
            {completed}
          </h3>
        </div>

      </div>
    </motion.div>
  );
}

export default RideStatistics;