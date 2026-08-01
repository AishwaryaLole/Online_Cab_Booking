import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getDriverByUserId } from "../../services/driverService";
import { getAssignedRides, acceptRide, rejectRide } from "../../services/rideService";

export default function AssignedRide() {
  const { userId } = useAuth();
  const [driverId, setDriverId] = useState(null);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  const loadAssignedRide = async (id) => {
    const res = await getAssignedRides(id);
    if (res.success && res.data.length > 0) {
      setRide(res.data[0]);
    } else {
      setRide(null);
    }
  };

  useEffect(() => {
    const load = async () => {
      const driverRes = await getDriverByUserId(userId);
      if (!driverRes.success) {
        toast.error(driverRes.message);
        setLoading(false);
        return;
      }
      setDriverId(driverRes.data.id);
      await loadAssignedRide(driverRes.data.id);
      setLoading(false);
    };
    load();
  }, [userId]);

  const handleAccept = async () => {
    setActing(true);
    const res = await acceptRide(ride.id);
    setActing(false);

    if (res.success) {
      toast.success(res.message || "Ride accepted");
      loadAssignedRide(driverId);
    } else {
      toast.error(res.message);
    }
  };

  const handleReject = async () => {
    setActing(true);
    const res = await rejectRide(ride.id);
    setActing(false);

    if (res.success) {
      toast.success(res.message || "Ride rejected");
      loadAssignedRide(driverId);
    } else {
      toast.error(res.message);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading assigned ride...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Assigned ride</h1>
      <p className="text-gray-500 text-sm mb-6">Manage your current assignment.</p>

      {!ride ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-gray-500 text-sm">
          No ride assigned right now.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500">Pickup</p>
              <p className="font-bold text-gray-900">{ride.pickupLocation}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Drop</p>
              <p className="font-bold text-gray-900">{ride.dropLocation}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Distance</p>
              <p className="font-bold text-gray-900">{ride.distanceKm ?? "-"} km</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500">Fare</p>
              <p className="font-bold text-indigo-600">₹{ride.fare ?? "-"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleAccept} disabled={acting}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-60">
              Accept ride
            </button>
            <button onClick={handleReject} disabled={acting}
              className="bg-red-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-red-600 disabled:opacity-60">
              Reject ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
}