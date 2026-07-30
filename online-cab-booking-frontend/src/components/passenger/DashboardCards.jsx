import {
  FaCar,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
} from "react-icons/fa";
import { motion } from "framer-motion";

function DashboardCards({
  totalRides,
  completedRides,
  cancelledRides,
  totalSpent,
}) {
  const cards = [
    {
      title: "Total Rides",
      value: totalRides,
      icon: <FaCar />,
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: completedRides,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Cancelled",
      value: cancelledRides,
      icon: <FaTimesCircle />,
      color: "bg-red-500",
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent}`,
      icon: <FaWallet />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 text-sm">{card.title}</p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {card.value}
            </h2>
          </div>

          <div
            className={`${card.color} h-14 w-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}
          >
            {card.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardCards;