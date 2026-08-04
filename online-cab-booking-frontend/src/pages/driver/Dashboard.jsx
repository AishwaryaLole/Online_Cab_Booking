import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getDriverByUserId, updateDriverStatus } from "../../services/driverService";
import { getDriverRideHistory } from "../../services/rideService";

export default function Dashboard() {
  const { userId, name } = useAuth();
  const [driver, setDriver] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const driverRes = await getDriverByUserId(userId);
      if (!driverRes.success) {
        toast.error(driverRes.message);
        setLoading(false);
        return;
      }
      setDriver(driverRes.data);

      const historyRes = await getDriverRideHistory(driverRes.data.id);
      if (historyRes.success) setRides(historyRes.data);

      setLoading(false);
    };
    load();
  }, [userId]);

  const completedRides = rides.filter((r) => r.status === "COMPLETED");
  const totalEarnings = completedRides.reduce((sum, r) => sum + (r.fare || 0), 0);

  if (loading) return <p className="p-6 text-gray-500">Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Driver dashboard</h1>
      <p className="text-gray-500 text-sm mb-6">Welcome back, {name}</p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-500">Total rides</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{rides.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{completedRides.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-500">Status</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{driver?.status}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-500">Earnings</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">₹{totalEarnings}</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-3">Recent activity</h2>
      <div className="space-y-3">
        {rides.length === 0 && (
          <p className="text-gray-500 text-sm">No rides yet.</p>
        )}
        {rides.map((ride) => (
          <div key={ride.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{ride.pickupLocation} → {ride.dropLocation}</p>
              <p className="text-xs text-gray-500">{ride.status}</p>
            </div>
            <p className="font-bold text-indigo-600">₹{ride.fare ?? "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}