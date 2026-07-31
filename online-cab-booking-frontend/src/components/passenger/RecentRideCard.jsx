function RecentRideCard({ ride }) {
  if (!ride) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Ride
        </h2>

        <p className="text-gray-500">
          No rides available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Recent Ride
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Pickup:</strong> {ride.pickupLocation}
        </p>

        <p>
          <strong>Drop:</strong> {ride.dropLocation}
        </p>

        <p>
          <strong>Fare:</strong>{" "}
          {ride.fare ? `₹${ride.fare}` : "Not Available"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm">
            {ride.status}
          </span>
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(ride.createdAt).toLocaleDateString()}
        </p>

      </div>
    </div>
  );
}

export default RecentRideCard;