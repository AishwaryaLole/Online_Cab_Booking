import React from "react";

const colorClasses = {
  green: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: "💰",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: "📈",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    icon: "📅",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: "🏆",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    icon: "🚖",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-700",
    icon: "⭐",
  },
};

const EarningsCard = ({ title, value, color = "green" }) => {
  const theme = colorClasses[color] || colorClasses.green;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className={`text-3xl font-bold mt-3 ${theme.text}`}>
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${theme.bg}`}
        >
          {theme.icon}
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;