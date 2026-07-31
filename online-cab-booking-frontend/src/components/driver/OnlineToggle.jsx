import { useState } from "react";
import { toast } from "react-toastify";
import { updateDriverAvailability } from "../../services/driverService";

// Simple ON/OFF switch for driver availability
// Props:
//   status  -> current online/offline value (boolean)
//   refresh -> function to re-fetch dashboard data after update
const OnlineToggle = ({ status, refresh }) => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);

      const newStatus = !status;

      // Change 1 to logged-in driver id later (from auth)
      await updateDriverAvailability(1, newStatus);

      toast.success(newStatus ? "You are now Online" : "You are now Offline");

      if (refresh) refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-5 py-2 rounded-full text-white font-semibold shadow transition
        ${status ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 hover:bg-gray-500"}
        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {loading ? "Updating..." : status ? "ONLINE" : "OFFLINE"}
    </button>
  );
};

export default OnlineToggle;