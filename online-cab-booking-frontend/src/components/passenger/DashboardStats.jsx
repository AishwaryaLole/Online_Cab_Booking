function DashboardStats({
  totalRides,
  completedRides,
  activeRides,
  totalSpent,
}) {
  const cards = [
    {
      title: "Total Rides",
      value: totalRides,
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: completedRides,
      color: "bg-green-500",
    },
    {
      title: "Active",
      value: activeRides,
      color: "bg-yellow-500",
    },
    {
      title: "Total Spent",
      value: `₹${totalSpent}`,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
        >
          <div
            className={`w-12 h-12 rounded-full ${card.color} mb-4`}
          ></div>

          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;