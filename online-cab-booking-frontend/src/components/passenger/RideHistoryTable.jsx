import { useState } from "react";
import RideCard from "./RideCard";

function RideHistoryTable() {
  // Dummy Ride Data
  const [rides] = useState([
    {
      id: 1,
      pickup: "Pune Railway Station",
      drop: "CDAC ACTS Pune",
      date: "29 Jul 2026",
      fare: 250,
      status: "COMPLETED",
    },
    {
      id: 2,
      pickup: "Hinjewadi Phase 1",
      drop: "Shivajinagar",
      date: "27 Jul 2026",
      fare: 180,
      status: "ONGOING",
    },
    {
      id: 3,
      pickup: "Swargate",
      drop: "Katraj",
      date: "25 Jul 2026",
      fare: 120,
      status: "CANCELLED",
    },
    {
      id: 4,
      pickup: "Airport",
      drop: "Viman Nagar",
      date: "22 Jul 2026",
      fare: 300,
      status: "COMPLETED",
    },
  ]);

  // Search State
  const [search, setSearch] = useState("");

  // Status Filter
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Filter by Search + Status
  const filteredRides = rides.filter((ride) => {
    const searchMatch =
      ride.pickup.toLowerCase().includes(search.toLowerCase()) ||
      ride.drop.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "ALL" ||
      ride.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">
        Ride History
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        View all your previous rides.
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Pickup or Drop..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Status Filter */}
      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => setStatusFilter("ALL")}
          className={`px-4 py-2 rounded-xl font-medium ${
            statusFilter === "ALL"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatusFilter("COMPLETED")}
          className={`px-4 py-2 rounded-xl font-medium ${
            statusFilter === "COMPLETED"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Completed
        </button>

        <button
          onClick={() => setStatusFilter("ONGOING")}
          className={`px-4 py-2 rounded-xl font-medium ${
            statusFilter === "ONGOING"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Ongoing
        </button>

        <button
          onClick={() => setStatusFilter("CANCELLED")}
          className={`px-4 py-2 rounded-xl font-medium ${
            statusFilter === "CANCELLED"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Cancelled
        </button>

      </div>

      {/* Ride List */}
      <div className="space-y-4">

        {filteredRides.length > 0 ? (

          filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
            />
          ))

        ) : (

          <div className="bg-gray-50 border rounded-xl p-6 text-center text-gray-500">
            No rides found.
          </div>

        )}

      </div>

    </div>
  );
}

export default RideHistoryTable;