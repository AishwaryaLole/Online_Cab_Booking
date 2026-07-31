import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDriverById } from "../../services/driverService";

const Profile = () => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      // Temporary: Using Driver ID 1
      // Replace with logged-in driver ID later
      const response = await getDriverById(1);

      setDriver(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading Profile...
        </h2>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Driver profile not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          👤 Driver Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Driver Details */}

          <h2 className="text-2xl font-semibold mb-5">
            Driver Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Driver ID</p>
              <p className="font-semibold">{driver.id}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">User ID</p>
              <p className="font-semibold">{driver.userId}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">License Number</p>
              <p className="font-semibold">
                {driver.licenseNumber}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500">Status</p>
              <p className="font-semibold">
                {driver.status}
              </p>
            </div>

          </div>

          {/* Vehicle */}

          <h2 className="text-2xl font-semibold mt-8 mb-5">
            Vehicle Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Vehicle Number</p>
              <p className="font-semibold">
                {driver.vehicle?.vehicleNumber || "N/A"}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Vehicle Type</p>
              <p className="font-semibold">
                {driver.vehicle?.vehicleType || "N/A"}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Model</p>
              <p className="font-semibold">
                {driver.vehicle?.model || "N/A"}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Color</p>
              <p className="font-semibold">
                {driver.vehicle?.color || "N/A"}
              </p>
            </div>

          </div>

          {/* Location */}

          <h2 className="text-2xl font-semibold mt-8 mb-5">
            Current Location
          </h2>

          <div className="bg-green-50 rounded-lg p-5">

            <p className="mb-2">
              <strong>Latitude:</strong>{" "}
              {driver.location?.latitude ?? "N/A"}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {driver.location?.longitude ?? "N/A"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;