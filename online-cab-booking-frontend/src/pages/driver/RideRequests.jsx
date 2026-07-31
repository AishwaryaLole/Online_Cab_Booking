import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import RideRequestCard from "../../components/driver/RideRequestCard";
import { getPendingRides, acceptRide, rejectRide } from "../../services/rideService";

const RideRequests = () => {
  const navigate = useNavigate();

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      setLoading(true);

      // Change 1 to the logged-in driver's ID once login is wired up
      const data = await getPendingRides(1);

      setRides(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load ride requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (rideId) => {
    try {
      await acceptRide(rideId);

      toast.success("Ride accepted!");

      const acceptedRide = rides.find((r) => r.id === rideId);

      navigate("/driver/current-ride", { state: { ride: acceptedRide } });
    } catch (error) {
      console.error(error);
      toast.error("Unable to accept ride");
    }
  };

  const handleReject = async (rideId) => {
    try {
      await rejectRide(rideId);

      toast.success("Ride rejected");

      setRides((prev) => prev.filter((r) => r.id !== rideId));
    } catch (error) {
      console.error(error);
      toast.error("Unable to reject ride");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading ride requests...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ride Requests</h1>
        <p className="text-gray-500 mt-1">Accept or reject incoming rides.</p>
      </div>

      {rides.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">No ride requests</h2>
          <p className="text-gray-500 mt-2">You're all caught up!</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {rides.map((ride) => (
            <RideRequestCard
              key={ride.id}
              ride={ride}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RideRequests;