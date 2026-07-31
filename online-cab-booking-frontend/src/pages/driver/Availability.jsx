import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AvailabilitySwitch from "../../components/driver/AvailabilitySwitch";
import { getDriverAvailability } from "../../services/driverService";

const Availability = () => {
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);

      // Temporary: using Driver ID = 1
      // Replace with logged-in driver ID once login is wired up
      const data = await getDriverAvailability(1);

      setOnline(data.online);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">Loading Availability...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Driver Availability</h1>
        <p className="text-gray-500 mt-1">Manage your online/offline status.</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Current Status</h2>
          <p className={`mt-1 font-bold ${online ? "text-green-600" : "text-red-600"}`}>
            {online ? "Online" : "Offline"}
          </p>
        </div>

        <AvailabilitySwitch
          initialStatus={online}
          onStatusChange={(status) => setOnline(status)}
        />
      </div>

      {/* Online-hours / completed-rides stats removed for now —
          backend doesn't track session duration yet. Ask backend
          teammate to add these to DriverDto if you want them back:
          todayHours, totalHours, completedRides */}
    </div>
  );
};

export default Availability;