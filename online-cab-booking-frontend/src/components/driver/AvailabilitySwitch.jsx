import { useState } from "react";
import { toast } from "react-toastify";
import { updateDriverAvailability } from "../../services/driverService";

const DRIVER_ID = 1; // Temporary until login is implemented

const AvailabilitySwitch = ({
  initialStatus = false,
  onStatusChange,
}) => {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const newStatus = !isOnline;

      await updateDriverAvailability(
        DRIVER_ID,
        newStatus
      );

      setIsOnline(newStatus);

      if (onStatusChange) {
        onStatusChange(newStatus);
      }

      toast.success(
        `Driver is now ${
          newStatus ? "Online" : "Offline"
        }`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">

      <span
        className={`font-semibold ${
          isOnline
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>

      <button
        onClick={handleToggle}
        disabled={loading}
        className={`relative w-14 h-8 rounded-full transition ${
          isOnline
            ? "bg-green-500"
            : "bg-gray-400"
        } ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
            isOnline ? "translate-x-6" : ""
          }`}
        />
      </button>

    </div>
  );
};

export default AvailabilitySwitch;