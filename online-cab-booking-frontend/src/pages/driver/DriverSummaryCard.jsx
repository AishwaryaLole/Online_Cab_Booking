// Small reusable stat card used on the Dashboard
// Props: title, value, icon
const DriverSummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>

      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default DriverSummaryCard;