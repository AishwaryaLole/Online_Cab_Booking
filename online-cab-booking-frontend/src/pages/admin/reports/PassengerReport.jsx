import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Car,
  IndianRupee,
  Star,
} from "lucide-react";

import adminService from "../../../services/adminService";

const PassengerReport = () => {
  const [passengers, setPassengers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
  async function loadPassengers() {
    try {
      setLoading(true);

      const response =
        await adminService.getPassengerReport();

      setPassengers(response.data || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
    loadPassengers();
  }, []);


  const filteredPassengers = useMemo(() => {
    return passengers.filter((passenger) => {
      const keyword = search.toLowerCase();

      return (
        passenger.name?.toLowerCase().includes(keyword) ||
        passenger.email?.toLowerCase().includes(keyword) ||
        passenger.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [passengers, search]);

  const totalPassengers = passengers.length;

  const totalTrips = passengers.reduce(
    (sum, p) => sum + Number(p.totalTrips || 0),
    0
  );

  const totalSpending = passengers.reduce(
    (sum, p) => sum + Number(p.totalSpent || 0),
    0
  );

  const activePassengers = passengers.filter(
    (p) => p.totalTrips > 0
  ).length;

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Passenger Report...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Passenger Report
        </h1>

        <p className="text-gray-500">
          Passenger activity and spending report
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white rounded-xl p-5">

          <Users size={30} />

          <h3 className="mt-3">
            Total Passengers
          </h3>

          <p className="text-3xl font-bold">
            {totalPassengers}
          </p>

        </div>

        <div className="bg-green-500 text-white rounded-xl p-5">

          <Car size={30} />

          <h3 className="mt-3">
            Total Trips
          </h3>

          <p className="text-3xl font-bold">
            {totalTrips}
          </p>

        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-5">

          <IndianRupee size={30} />

          <h3 className="mt-3">
            Total Spending
          </h3>

          <p className="text-3xl font-bold">
            ₹ {totalSpending}
          </p>

        </div>

        <div className="bg-purple-500 text-white rounded-xl p-5">

          <Star size={30} />

          <h3 className="mt-3">
            Active Passengers
          </h3>

          <p className="text-3xl font-bold">
            {activePassengers}
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-lg shadow p-4">

        <input
          type="text"
          placeholder="Search Passenger..."
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
                  Name
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-left">
                  Phone
                </th>

                <th className="px-4 py-3 text-center">
                  Trips
                </th>

                <th className="px-4 py-3 text-center">
                  Total Spending
                </th>

                <th className="px-4 py-3 text-center">
                  Rating
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPassengers.map((passenger) => (

                <tr
                  key={passenger.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-3 font-medium">
                    {passenger.name}
                  </td>

                  <td className="px-4 py-3">
                    {passenger.email}
                  </td>

                  <td className="px-4 py-3">
                    {passenger.phone}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {passenger.totalTrips}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    ₹ {passenger.totalSpent}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                      ⭐ {passenger.rating || "5.0"}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default PassengerReport;