import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import VehicleCard from "../../components/driver/VehicleCard";
import { getDriverById } from "../../services/driverService";

const VehicleDetails = () => {
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      setLoading(true);

      // Temporary: using Driver ID = 1
      // Replace with logged-in driver ID after authentication is implemented
      const driver = await getDriverById(1);

      if (driver?.vehicle) {
        setVehicle(driver.vehicle);
      } else {
        setVehicle(null);
        toast.info("No vehicle registered.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load vehicle details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">Loading Vehicle Details...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🚗 Vehicle Details</h1>
        <p className="text-gray-500 mt-1">View your registered vehicle information.</p>
      </div>

      <VehicleCard vehicle={vehicle} />
    </div>
  );
};

export default VehicleDetails;