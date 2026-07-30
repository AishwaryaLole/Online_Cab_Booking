function RideCard({ ride }) {
  const statusColor = {
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    ONGOING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-lg font-semibold">
          {ride.pickup}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColor[ride.status]
          }`}
        >
          {ride.status}
        </span>

      </div>

      <p className="text-gray-600">
        <strong>Drop:</strong> {ride.drop}
      </p>

      <p className="text-gray-600">
        <strong>Date:</strong> {ride.date}
      </p>

      <p className="text-gray-600">
        <strong>Fare:</strong> ₹{ride.fare}
      </p>

    </div>
  );
}

export default RideCard;