import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateDriverAvailability } from "../../services/driverService";

const AvailabilitySwitch = ({ initialStatus = false, driverId = 1, onStatusChange }) => {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  // Synchronize state when initialStatus changes after async API fetch
  useEffect(() => {
    setIsOnline(initialStatus);
  }, [initialStatus]);

  const handleToggle = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const newStatus = !isOnline;

      // Calls updateDriverAvailability(driverId, online) in driverService.js
      await updateDriverAvailability(driverId, newStatus);

      setIsOnline(newStatus);
      toast.success(`You are now ${newStatus ? "Online" : "Offline"}`);

      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error("Availability Toggle Error:", error);
      toast.error(error.message || "Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-sm font-semibold ${
          isOnline ? "text-green-600" : "text-red-600"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>

      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
            isOnline ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default AvailabilitySwitch;