import { Link } from "react-router-dom";
import { FaCarSide, FaHistory, FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";

function QuickActions() {
  const actions = [
    {
      title: "Book Ride",
      icon: <FaCarSide className="text-3xl text-blue-600" />,
      path: "/passenger/book-ride",
      bg: "bg-blue-50",
    },
    {
      title: "Ride History",
      icon: <FaHistory className="text-3xl text-green-600" />,
      path: "/passenger/ride-history",
      bg: "bg-green-50",
    },
    {
      title: "My Profile",
      icon: <FaUserEdit className="text-3xl text-purple-600" />,
      path: "/passenger/profile",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {actions.map((action, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={action.path}
            className={`${action.bg} rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center transition-all duration-300`}
          >
            {action.icon}

            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              {action.title}
            </h3>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default QuickActions;