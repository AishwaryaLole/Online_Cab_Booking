import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import RideCard from "../../components/driver/RideCard";
import { getDriverRideHistory } from "../../services/rideService";

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      // Change 1 to the logged-in driver's ID once login is wired up
      const data = await getDriverRideHistory(1);

      setRides(data || []);
    } catch (error) {
      console.error(error);
      // Backend endpoint isn't ready yet — fail quietly, show empty state
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading ride history...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🚖 Ride History</h1>
        <p className="text-gray-500 mt-1">View all your completed rides.</p>
      </div>

      {rides.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <div className="text-5xl mb-3">🚕</div>
          <h2 className="text-xl font-semibold text-gray-700">No ride history</h2>
          <p className="text-gray-500 mt-2">
            Your completed rides will appear here once the backend
            provides ride history data.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;