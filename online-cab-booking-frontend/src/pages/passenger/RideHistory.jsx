import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Search, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRideHistory, cancelRide } from "../../services/rideService";
import StatusBadge from "../../components/passenger/StatusBadge";

const FILTERS = ["ALL", "REQUESTED", "ASSIGNED", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export default function RideHistory() {
  const { userId } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const loadRides = () => {
    if (!userId) return;
    setLoading(true);
    getRideHistory(userId)
      .then((res) => setRides(res?.data || []))
      .catch(() => toast.error("Failed to load ride history."))
      .finally(() => setLoading(false));
  };

  useEffect(loadRides, [userId]);

  const handleCancel = async (rideId) => {
    try {
      const res = await cancelRide(rideId);
      if (res.success) {
        toast.success("Ride cancelled.");
        loadRides();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel ride.");
    }
  };

  const filteredRides = useMemo(() => {
    return rides
      .filter((r) => (filter === "ALL" ? true : r.status === filter))
      .filter((r) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          r.pickupLocation?.toLowerCase().includes(q) ||
          r.dropLocation?.toLowerCase().includes(q) ||
          String(r.id).includes(q)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [rides, search, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Ride history</h1>
        <p className="text-gray-500 text-sm mt-1">Search and filter your past trips.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ride, pickup, drop..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="py-3 pr-4">Ride ID</th>
                <th className="py-3 pr-4">Pickup</th>
                <th className="py-3 pr-4">Drop</th>
                <th className="py-3 pr-4">Fare</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    Loading rides...
                  </td>
                </tr>
              )}

              {!loading && filteredRides.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No rides found.
                  </td>
                </tr>
              )}

              {!loading &&
                filteredRides.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-none">
                    <td className="py-3 pr-4 font-medium text-gray-700">RD-{r.id}</td>
                    <td className="py-3 pr-4 text-gray-600 max-w-[180px] truncate">{r.pickupLocation}</td>
                    <td className="py-3 pr-4 text-gray-600 max-w-[180px] truncate">{r.dropLocation}</td>
                    <td className="py-3 pr-4 font-medium text-gray-800">
                      {r.fare != null ? `₹${r.fare}` : "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="py-3 pr-4 text-gray-500">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 pr-4">
                      {(r.status === "REQUESTED" || r.status === "ASSIGNED") && (
                        <button
                          onClick={() => handleCancel(r.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs font-semibold"
                        >
                          <X size={13} /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
