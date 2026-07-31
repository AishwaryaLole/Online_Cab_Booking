import { useEffect, useState } from "react";
import RideCard from "./RideCard";
import { getRideHistory } from "../../services/passengerService";

function RideHistoryTable() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchRideHistory();
  }, []);

  const fetchRideHistory = async () => {
    try {
      const response = await getRideHistory(2); // Passenger ID

      console.log("Ride History:", response);

      if (response.success) {
        setRides(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load ride history.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRides = rides.filter((ride) => {
    const pickup = ride.pickupLocation || "";
    const drop = ride.dropLocation || "";

    const searchMatch =
      pickup.toLowerCase().includes(search.toLowerCase()) ||
      drop.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "ALL" ||
      ride.status === statusFilter;

    return searchMatch && statusMatch;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        Loading Ride History...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Ride History
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        View all your previous rides.
      </p>

      <input
        type="text"
        placeholder="Search by Pickup or Drop..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border rounded-xl p-3 mb-6"
      />

      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => setStatusFilter("ALL")}
          className={`px-4 py-2 rounded-xl ${
            statusFilter === "ALL"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatusFilter("REQUESTED")}
          className={`px-4 py-2 rounded-xl ${
            statusFilter === "REQUESTED"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Requested
        </button>

        <button
          onClick={() => setStatusFilter("COMPLETED")}
          className={`px-4 py-2 rounded-xl ${
            statusFilter === "COMPLETED"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Completed
        </button>

        <button
          onClick={() => setStatusFilter("IN_PROGRESS")}
          className={`px-4 py-2 rounded-xl ${
            statusFilter === "IN_PROGRESS"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          In Progress
        </button>

        <button
          onClick={() => setStatusFilter("CANCELLED")}
          className={`px-4 py-2 rounded-xl ${
            statusFilter === "CANCELLED"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Cancelled
        </button>

      </div>

      <div className="space-y-4">

        {filteredRides.length > 0 ? (
        filteredRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onCancel={fetchRideHistory}
          />
        ))
        ) : (
          <div className="bg-gray-50 border rounded-xl p-6 text-center">
            No rides found.
          </div>
        )}

      </div>

    </div>
  );
}

export default RideHistoryTable;