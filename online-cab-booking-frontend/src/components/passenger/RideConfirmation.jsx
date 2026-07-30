// Component to display booking confirmation details
function RideConfirmation({ pickup, drop, fare, onConfirm }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

      {/* Card Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Ride Confirmation
      </h2>

      {/* Pickup */}
      <div className="mb-3">
        <p className="text-gray-500 text-sm">Pickup</p>
        <p className="font-semibold">
          {pickup || "Not Selected"}
        </p>
      </div>

      {/* Drop */}
      <div className="mb-3">
        <p className="text-gray-500 text-sm">Drop</p>
        <p className="font-semibold">
          {drop || "Not Selected"}
        </p>
      </div>

      {/* Fare */}
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Estimated Fare</p>
        <p className="text-2xl font-bold text-green-600">
          ₹ {fare}
        </p>
      </div>

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Confirm Booking
      </button>

    </div>
  );
}

export default RideConfirmation;