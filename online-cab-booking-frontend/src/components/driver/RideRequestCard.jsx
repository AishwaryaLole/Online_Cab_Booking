// Displays a single ride request with Accept/Reject buttons
// Props: ride (object), onAccept(rideId), onReject(rideId)
const RideRequestCard = ({ ride, onAccept, onReject }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {ride.passengerName ? ride.passengerName[0] : "P"}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {ride.passengerName || `Passenger #${ride.passengerId}`}
            </h3>
            <p className="text-gray-500 text-sm">{ride.passengerPhone || ""}</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
          {ride.status || "PENDING"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
        <div>
          <p className="text-gray-500">Pickup</p>
          <p className="font-medium">{ride.pickupLocation}</p>
        </div>

        <div>
          <p className="text-gray-500">Drop</p>
          <p className="font-medium">{ride.dropLocation}</p>
        </div>

        <div>
          <p className="text-gray-500">Distance</p>
          <p className="font-medium">{ride.distanceKm ?? "-"} km</p>
        </div>

        <div>
          <p className="text-gray-500">Fare</p>
          <p className="font-medium text-indigo-600">₹{ride.fare ?? "-"}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onAccept(ride.id)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
        >
          Accept ride
        </button>

        <button
          onClick={() => onReject(ride.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
        >
          Reject ride
        </button>
      </div>
    </div>
  );
};

export default RideRequestCard;