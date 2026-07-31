import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRideById } from "../../services/passengerService";

function TrackRide() {
  const { state } = useLocation();

  const rideId = state?.rideId;

  const [ride, setRide] = useState(null);

  const fetchRide = async () => {
    try {
      const response = await getRideById(rideId);

      if (response.success) {
        setRide(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!rideId) return;

    fetchRide();

    const interval = setInterval(fetchRide, 5000);

    return () => clearInterval(interval);
  }, [rideId]);

  if (!rideId) {
    return (
      <h2 className="text-center mt-10 text-red-600 text-xl">
        No Ride Selected
      </h2>
    );
  }

  if (!ride) {
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading Ride...
      </h2>
    );
  }

  const statusColor = {
    REQUESTED: "bg-blue-500",
    ASSIGNED: "bg-purple-500",
    ACCEPTED: "bg-indigo-500",
    IN_PROGRESS: "bg-yellow-500",
    COMPLETED: "bg-green-600",
    CANCELLED: "bg-red-600",
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">

      <h1 className="text-3xl font-bold mb-6">
        Track Ride
      </h1>

      <div className="space-y-3">

        <p>
          <strong>Ride ID:</strong> {ride.id}
        </p>

        <p>
          <strong>Pickup:</strong> {ride.pickupLocation}
        </p>

        <p>
          <strong>Drop:</strong> {ride.dropLocation}
        </p>

        <p>
          <strong>Distance:</strong>{" "}
          {ride.distanceKm ?? "Not Available"} km
        </p>

        <p>
          <strong>Duration:</strong>{" "}
          {ride.durationMin ?? "Not Available"} min
        </p>

        <p>
          <strong>Fare:</strong>{" "}
          ₹{ride.fare ?? "Not Calculated"}
        </p>

      </div>

      <div className="mt-8">

        <span
          className={`text-white px-5 py-2 rounded-full font-semibold ${statusColor[ride.status]}`}
        >
          {ride.status}
        </span>

      </div>

    </div>
  );
}

export default TrackRide;