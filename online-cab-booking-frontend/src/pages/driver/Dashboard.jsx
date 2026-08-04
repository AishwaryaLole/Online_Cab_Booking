<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDriverDashboard } from "../../services/driverService";
import AvailabilitySwitch from "../../components/driver/AvailabilitySwitch";
import { Car, DollarSign, Star, Clock, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get logged in user / driver ID from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const driverId = localStorage.getItem("driverId") || user.driverId || user.id || 1;

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDriverDashboard(driverId);
      setDashboardData(data);
    } catch (err) {
      console.error("Fetch Dashboard Error:", err);
      setError(err.message || "Failed to load driver details.");
      toast.error("Unable to load driver information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [driverId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        <span>Loading Driver Profile...</span>
      </div>
    );
  }

  if (error || !dashboardData?.driver) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <h4 className="font-bold">Driver Data Unavailable</h4>
            <p className="text-sm">{error || "Driver information could not be retrieved."}</p>
          </div>
        </div>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const { driver } = dashboardData;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {driver.user?.name || driver.name || `Driver #${driver.id}`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            License: <span className="font-semibold text-gray-700">{driver.licenseNumber || "N/A"}</span> | 
            Email: <span className="font-semibold text-gray-700">{driver.user?.email || "N/A"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="px-3 py-2 border text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            🔄 Refresh
          </button>

          <AvailabilitySwitch
            driverId={driver.id}
            initialStatus={driver.status === "AVAILABLE"}
            onStatusChange={(isOnline) => {
              setDashboardData((prev) => ({
                ...prev,
                driver: {
                  ...prev.driver,
                  status: isOnline ? "AVAILABLE" : "OFFLINE",
                },
              }));
            }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Total Rides</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{driver.totalRides || 0}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Car className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Today's Earnings</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">₹{driver.todaysEarnings || 0}</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Rating</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{driver.rating || "5.0"} ⭐</h3>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
            <Star className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">Pending Requests</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{driver.pendingRequests || 0}</h3>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Vehicle Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-3">
        <h3 className="text-lg font-bold text-gray-800">Linked Vehicle</h3>
        {driver.vehicle ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-xs text-gray-400">Model</p>
              <p className="font-semibold text-gray-700">{driver.vehicle.model || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Number Plate</p>
              <p className="font-semibold text-gray-700">{driver.vehicle.vehicleNumber || driver.vehicle.licensePlate || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Color</p>
              <p className="font-semibold text-gray-700">{driver.vehicle.color || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Capacity</p>
              <p className="font-semibold text-gray-700">{driver.vehicle.capacity || 4} Seats</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No vehicle currently assigned to this driver.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
=======
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
>>>>>>> 0a0591cd9d2f2167ec45a18eb85026850bf6a8e9
