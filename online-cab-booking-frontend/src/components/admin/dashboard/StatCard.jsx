const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        {/* Left Content */}
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-5 border-t pt-3">
        <span className="text-green-600 text-sm font-medium">
          Updated just now
        </span>
      </div>
    </div>
  );
};

export default StatCard;