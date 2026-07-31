import React, { useEffect, useState } from "react";
import { getDriverRideHistory } from "../../services/driverService";
import { toast } from "react-toastify";
import { Clock, MapPin, CheckCircle, XCircle, DollarSign } from "lucide-react";

const RideHistoryPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const driverId = localStorage.getItem("driverId") || 1;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getDriverRideHistory(driverId);
        setRides(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error(err.message || "Failed to load ride history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [driverId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-2"></div>
        Loading ride history...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Clock className="w-6 h-6 text-indigo-600" />
        Ride History
      </h1>

      {rides.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500 border border-gray-100">
          No completed or cancelled rides found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-semibold text-gray-500">
                  Ride #{ride.id}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                    ride.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {ride.status === "COMPLETED" ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {ride.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Pickup:</strong> {ride.pickupLocation || "N/A"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <span>
                    <strong>Dropoff:</strong> {ride.dropLocation || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t text-sm font-medium text-gray-800">
                <span className="flex items-center text-green-600 font-bold">
                  <DollarSign className="w-4 h-4" />
                  {ride.fare ? ride.fare.toFixed(2) : "0.00"}
                </span>
                <span className="text-xs text-gray-400">
                  {ride.completedAt
                    ? new Date(ride.completedAt).toLocaleDateString()
                    : "Recently"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistoryPage;