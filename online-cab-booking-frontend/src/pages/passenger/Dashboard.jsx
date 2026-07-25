import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { rideService } from "../../services/rideService";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";

export default function PassengerDashboard() {
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    rideService.history(user.id).then(setRides).catch(() => {}).finally(() => setLoading(false));
  }, [user?.id]);

  const active = rides.find((r) => ["REQUESTED","ASSIGNED","ACCEPTED","IN_PROGRESS"].includes(r.status));
  const completed = rides.filter((r) => r.status === "COMPLETED").length;
  const cancelled = rides.filter((r) => r.status === "CANCELLED").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
        Welcome, {user?.email?.split("@")[0] || "rider"} 👋
      </motion.h1>
      <p className="text-muted-foreground">Ready for your next trip?</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat icon={<FiMapPin />} label="Total rides" value={rides.length} />
        <Stat icon={<FiCheckCircle />} label="Completed" value={completed} />
        <Stat icon={<FiClock />} label="Cancelled" value={cancelled} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Current ride</h2>
          {active ? (
            <div className="mt-3">
              <div className="text-sm text-muted-foreground">Status: <span className="font-medium text-foreground">{active.status}</span></div>
              <div className="mt-2">{active.pickupLocation} → {active.dropLocation}</div>
              <Link to="/passenger/current-ride" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                Open ride
              </Link>
            </div>
          ) : (
            <div className="mt-3 text-sm text-muted-foreground">
              No active ride. <Link to="/passenger/book-ride" className="text-primary hover:underline">Book one now</Link>.
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/30 p-6">
          <h2 className="text-lg font-semibold">Quick book</h2>
          <p className="text-sm text-muted-foreground mt-1">Get where you need to go.</p>
          <Link to="/passenger/book-ride" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
            Book a ride →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Recent rides</h2>
        {loading ? <p className="mt-2 text-sm text-muted-foreground">Loading…</p> :
         rides.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">No rides yet.</p> :
         <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
           {rides.slice(0, 5).map((r) => (
             <li key={r.id} className="flex items-center justify-between p-4">
               <div><div className="font-medium">{r.pickupLocation} → {r.dropLocation}</div>
                 <div className="text-xs text-muted-foreground">{r.status} · ₹{r.fare ?? "—"}</div></div>
               <Link to="/passenger/ride-history" className="text-sm text-primary hover:underline">Details</Link>
             </li>
           ))}
         </ul>}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
}
