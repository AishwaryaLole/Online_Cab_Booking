import { User, CalendarCheck, Car } from "lucide-react";

const SummaryWidget = ({ title, items = [] }) => {
  const getIcon = () => {
    if (title.toLowerCase().includes("booking")) {
      return <CalendarCheck size={18} className="text-blue-600" />;
    }

    if (title.toLowerCase().includes("driver")) {
      return <Car size={18} className="text-green-600" />;
    }

    return <User size={18} className="text-gray-600" />;
  };

  const getStatusBadge = (status) => {
    if (!status) return null;

    let color = "bg-gray-100 text-gray-700";

    switch (status.toLowerCase()) {
      case "completed":
      case "active":
      case "approved":
        color = "bg-green-100 text-green-700";
        break;

      case "pending":
        color = "bg-yellow-100 text-yellow-700";
        break;

      case "cancelled":
      case "rejected":
      case "suspended":
        color = "bg-red-100 text-red-700";
        break;

      default:
        color = "bg-gray-100 text-gray-700";
    }

    return (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

        {getIcon()}
      </div>

      {/* Content */}
      <div className="max-h-80 overflow-y-auto">

        {items.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No data available.
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="font-medium text-gray-800">
                  {item.name ||
                    item.userName ||
                    item.driverName ||
                    item.bookingId ||
                    "Unknown"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.email ||
                    item.phone ||
                    item.pickupLocation ||
                    item.destination ||
                    ""}
                </p>
              </div>

              {getStatusBadge(item.status)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SummaryWidget;