import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  CheckCircle,
  Clock,
  Ban,
} from "lucide-react";

import adminService from "../../../services/adminService";

const DriverReport = () => {
  const [drivers, setDrivers] = useState([]);
const navigate = useNavigate();
const [summary, setSummary] = useState({
  totalDrivers: 0,
  approvedDrivers: 0,
  pendingDrivers: 0,
  suspendedDrivers: 0,
});

const [search, setSearch] = useState("");

const [loading, setLoading] = useState(true);

  useEffect(() => {
     async function loadDrivers() {
    try {
      setLoading(true);

      const response = await adminService.getDriverReport();

setDrivers(response.data.data.drivers || []);

setSummary(
  response.data.data.summary || {
    totalDrivers: 0,
    approvedDrivers: 0,
    pendingDrivers: 0,
    suspendedDrivers: 0,
  }
);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
    loadDrivers();
  }, []);

 

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const value = search.toLowerCase();

      return (
        driver.name?.toLowerCase().includes(value) ||
        driver.email?.toLowerCase().includes(value) ||
        driver.vehicleNumber?.toLowerCase().includes(value)
      );
    });
  }, [drivers, search]);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Driver Report...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold">
          Driver Report
        </h1>

        <p className="text-gray-500">
          Driver performance and approval summary
        </p>
      </div>

      <div>

        <select
          value="/admin/reports/drivers"
          onChange={(e) => navigate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2
                    bg-white shadow-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500"
        >
          <option value="/admin/reports/bookings">
            📖 Booking Report
          </option>

          <option value="/admin/reports/drivers">
            🚖 Driver Report
          </option>

          <option value="/admin/reports/revenue">
            💰 Revenue Report
          </option>

        </select>

      </div>

    </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white rounded-xl p-5">

          <Car size={30} />

          <h3 className="mt-3">
            Total Drivers
          </h3>

          <p className="text-3xl font-bold">
            {summary.totalDrivers}
          </p>

        </div>

        <div className="bg-green-500 text-white rounded-xl p-5">

          <CheckCircle size={30} />

          <h3 className="mt-3">
            Approved
          </h3>

          <p className="text-3xl font-bold">
            {summary.approvedDrivers}
          </p>

        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-5">

          <Clock size={30} />

          <h3 className="mt-3">
            Pending
          </h3>

          <p className="text-3xl font-bold">
            {summary.pendingDrivers}
          </p>

        </div>

        <div className="bg-red-500 text-white rounded-xl p-5">

          <Ban size={30} />

          <h3 className="mt-3">
            Suspended
          </h3>

          <p className="text-3xl font-bold">
           {summary.suspendedDrivers}
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-lg shadow p-4">

        <input
          type="text"
          placeholder="Search Driver..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Driver
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-left">
                  Phone
                </th>

                <th className="px-4 py-3 text-left">
                  Vehicle
                </th>

                <th className="px-4 py-3 text-left">
                  Trips
                </th>

                <th className="px-4 py-3 text-center">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

                {filteredDrivers.length > 0 ? (

                  filteredDrivers.map((driver) => (

                    <tr
                      key={driver.id}
                      className="border-b hover:bg-gray-50"
                    >

                  <td className="px-4 py-3 font-medium">
                    {driver.name}
                  </td>

                  <td className="px-4 py-3">
                    {driver.email}
                  </td>

                  <td className="px-4 py-3">
                    {driver.phone}
                  </td>

                  <td className="px-4 py-3">
                    {driver.vehicleNumber}
                  </td>

                  <td className="px-4 py-3">
                    {driver.totalTrips || 0}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        driver.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : driver.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {driver.status}
                    </span>

                  </td>

                </tr>

              ))    

  ) : (

    <tr>

      <td
        colSpan="6"
        className="text-center py-6 text-gray-500"
      >
        No Drivers Found
      </td>

    </tr>

  )}

</tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DriverReport;