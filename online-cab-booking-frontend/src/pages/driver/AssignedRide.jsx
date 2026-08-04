import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getDriverByUserId } from "../../services/driverService";
import {
  getAssignedRides,
  acceptRide,
  rejectRide,
  startRide,
  completeRide,
} from "../../services/rideService";
import { makePayment } from "../../services/paymentService";

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

  const handleStart = async () => {
    setActing(true);
    try {
      const res = await startRide(ride.id);
      toast.success(res.message || "Ride started");
      loadAssignedRide(driverId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start ride");
    } finally {
      setActing(false);
    }
  };

  // For CASH rides, the driver taps this once they've physically collected
  // the fare from the passenger at drop-off. This records the payment in the
  // system - only after that does "Complete ride" become available.
  const handleCollectCash = async () => {
    setActing(true);
    try {
      const res = await makePayment({
        rideId: ride.id,
        paymentMethod: "CASH",
        amount: ride.fare,
      });
      if (res.success) {
        toast.success("Cash payment recorded");
        loadAssignedRide(driverId);
      } else {
        toast.error(res.message || "Could not record cash payment");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not record cash payment");
    } finally {
      setActing(false);
    }
  };

  const handleComplete = async () => {
    setActing(true);
    try {
      const res = await completeRide(ride.id);
      toast.success(res.message || "Ride completed");
      // The ride is COMPLETED now, so it will no longer show up as "active"
      // for this driver - loading again clears the card.
      loadAssignedRide(driverId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to complete ride");
    } finally {
      setActing(false);
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
              <p className="font-bold text-indigo-600">
                ₹{ride.fare != null ? Number(ride.fare).toFixed(1) : "-"}
                {" "}
                <span className="text-xs font-medium text-gray-400">({ride.paymentMethod})</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {ride.status === "ASSIGNED" && (
              <>
                <button onClick={handleAccept} disabled={acting}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-60">
                  Accept ride
                </button>
                <button onClick={handleReject} disabled={acting}
                  className="bg-red-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-red-600 disabled:opacity-60">
                  Reject ride
                </button>
              </>
            )}

            {ride.status === "ACCEPTED" && (
              <button onClick={handleStart} disabled={acting}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-60">
                Start ride
              </button>
            )}

            {ride.status === "IN_PROGRESS" && !ride.paid && ride.paymentMethod === "CASH" && (
              <button onClick={handleCollectCash} disabled={acting}
                className="bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-600 disabled:opacity-60">
                Collect cash payment (₹{ride.fare != null ? Number(ride.fare).toFixed(1) : "-"})
              </button>
            )}

            {ride.status === "IN_PROGRESS" && (ride.paid || ride.paymentMethod !== "CASH") && (
              <button onClick={handleComplete} disabled={acting}
                className="bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-60">
                Complete ride
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
