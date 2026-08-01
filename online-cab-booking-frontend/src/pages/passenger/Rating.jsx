import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRideHistory } from "../../services/rideService";
import { giveRating, getRatingsByPassenger } from "../../services/ratingService";

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="focus:outline-none"
        >
          <Star
            size={24}
            className={n <= value ? "fill-amber-400 text-amber-400" : "text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
}

export default function Rating() {
  const { userId } = useAuth();

  const [rides, setRides] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRideId, setSelectedRideId] = useState("");
  const [stars, setStars] = useState(5);
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [rideRes, ratingRes] = await Promise.all([
        getRideHistory(userId),
        getRatingsByPassenger(userId),
      ]);
      setRides(rideRes?.data || []);
      setRatings(ratingRes?.data || []);
    } catch {
      toast.error("Failed to load rating data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Completed rides with an assigned driver that haven't been rated yet
  const ratableRides = useMemo(() => {
    const ratedRideIds = new Set(ratings.map((r) => r.rideId));
    return rides.filter(
      (r) => r.status === "COMPLETED" && r.driverId != null && !ratedRideIds.has(r.id)
    );
  }, [rides, ratings]);

  const selectedRide = rides.find((r) => r.id === Number(selectedRideId));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRideId) {
      toast.error("Please select a ride to rate.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await giveRating({
        rideId: Number(selectedRideId),
        passengerId: userId,
        driverId: selectedRide.driverId,
        rating: stars,
        comments,
      });
      if (res.success) {
        toast.success("Thanks for your feedback!");
        setSelectedRideId("");
        setStars(5);
        setComments("");
        loadData();
      } else {
        toast.error(res.message || "Could not submit rating.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit rating.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Rating & Review</h1>
        <p className="text-gray-500 text-sm mt-1">Rate your recent trips and see your past reviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Give a rating */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 h-fit"
        >
          <h3 className="font-bold text-gray-900">Rate a completed ride</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Select ride</label>
            <select
              value={selectedRideId}
              onChange={(e) => setSelectedRideId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              <option value="">
                {ratableRides.length === 0 ? "No rides to rate" : "Choose a ride"}
              </option>
              {ratableRides.map((r) => (
                <option key={r.id} value={r.id}>
                  RD-{r.id} · {r.pickupLocation} → {r.dropLocation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Your rating</label>
            <StarPicker value={stars} onChange={setStars} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              placeholder="How was your ride?"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !selectedRideId}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            {submitting ? "Submitting..." : "Submit rating"}
          </button>
        </form>

        {/* Past ratings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Your past reviews</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {loading && <p className="text-sm text-gray-400">Loading...</p>}
            {!loading && ratings.length === 0 && (
              <p className="text-sm text-gray-400">You haven't rated any rides yet.</p>
            )}
            {!loading &&
              ratings.map((r) => (
                <div key={r.id} className="border border-gray-100 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">Ride #{r.rideId}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={14}
                          className={n <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  {r.comments && (
                    <p className="text-xs text-gray-500 mt-1">{r.comments}</p>
                  )}
                  <p className="text-[11px] text-gray-400 mt-1">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
