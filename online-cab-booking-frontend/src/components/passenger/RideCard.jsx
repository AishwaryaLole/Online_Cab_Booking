import { cancelRide } from "../../services/passengerService";

function RideCard({ ride, onCancel }) {
  const statusColor = {
    REQUESTED: "bg-blue-100 text-blue-700",
    ASSIGNED: "bg-purple-100 text-purple-700",
    ACCEPTED: "bg-indigo-100 text-indigo-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this ride?"
    );

    if (!confirmCancel) return;

    try {
      const response = await cancelRide(ride.id);

      alert(response.message);

      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error(error);
      alert("Unable to cancel ride.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-4">

        <h3 className="text-lg font-semibold">
          {ride.pickupLocation}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColor[ride.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {ride.status}
        </span>

      </div>

      <p className="text-gray-600">
        <strong>Drop:</strong> {ride.dropLocation}
      </p>

      <p className="text-gray-600">
        <strong>Date:</strong>{" "}
        {ride.createdAt
          ? new Date(ride.createdAt).toLocaleString()
          : "-"}
      </p>

      <p className="text-gray-600 mb-4">
        <strong>Fare:</strong> ₹
        {ride.fare != null ? ride.fare : "Not Calculated"}
      </p>

      {(ride.status === "REQUESTED" ||
        ride.status === "ASSIGNED") && (
        <button
          onClick={handleCancel}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Cancel Ride
        </button>
      )}

    </div>
  );
}

export default RideCard;