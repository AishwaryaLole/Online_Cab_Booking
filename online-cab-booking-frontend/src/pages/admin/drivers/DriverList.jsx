import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import adminService from "../../../services/adminService";
import DriverTable from "../../../components/admin/drivers/DriverTable";
import DriverModal from "../../../components/admin/drivers/DriverModel";


const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

 useEffect(() => {
  async function loadDrivers() {
    try {
      setLoading(true);

      const response = await adminService.getDrivers();
      const driversData = response?.data?.data || response?.data || response || [];

      const normalizedDrivers = (Array.isArray(driversData) ? driversData : []).map((driver) => ({
        ...driver,
        id: driver.id ?? driver.driverId,
      }));

      setDrivers(normalizedDrivers);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load drivers.");
    } finally {
      setLoading(false);
    }
  }

  loadDrivers();
}, []);

  const approveDriver = async (id) => {
    try {
      await adminService.approveDriver(id);
      toast.success("Approved successfully.");

      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === id
            ? { ...driver, status: "APPROVED" }
            : driver
        )
      );
    } catch (err) {
        console.error(err)
      toast.error("Error during Approve");
    }
  };

  const rejectDriver = async (id) => {
    try {
      await adminService.rejectDriver(id);
      toast.success("Reject successfully.");

      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === id
            ? { ...driver, status: "REJECTED" }
            : driver
        )
      );
    } catch (err) {
       console.error(err)
      toast.error("Error during Reject");
    }
  };

  const suspendDriver = async (id) => {
    try {
      await adminService.suspendDriver(id);
      toast.success("Suspend successfully.");

      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === id
            ? { ...driver, status: "SUSPENDED" }
            : driver
        )
      );
    } catch (err) {
      console.error(err)
      toast.error("Error during Suspending");
    }
  };

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const value = search.toLowerCase();

      return (
        driver.name?.toLowerCase().includes(value) ||
        driver.email?.toLowerCase().includes(value) ||
        driver.phone?.toLowerCase().includes(value) ||
        driver.vehicleNumber?.toLowerCase().includes(value)
      );
    });
  }, [drivers, search]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading Drivers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        {error}
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Driver Management
          </h1>

          <p className="text-gray-500">
            Manage all registered drivers.
          </p>

        </div>

        <input
          type="text"
          placeholder="Search Drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-72 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      <DriverTable
        drivers={filteredDrivers}
        onView={setSelectedDriver}
        onApprove={approveDriver}
        onReject={rejectDriver}
        onSuspend={suspendDriver}
      />

      {selectedDriver && (
        <DriverModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
        />
      )}

    </div>
  );
};

export default DriverList;