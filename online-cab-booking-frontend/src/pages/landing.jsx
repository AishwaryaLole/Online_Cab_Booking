import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiShield } from "react-icons/fi";

export default function Landing() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Ride smarter with CabGo
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Your ride, one tap away.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Book cabs in seconds, track your driver live on the map, and pay how you like. Built for
              passengers, drivers and fleet admins.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register/passenger" className="rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow hover:opacity-90">
                Book your first ride
              </Link>
              <Link to="/register/driver" className="rounded-lg border border-border px-5 py-3 font-medium hover:bg-accent">
                Drive with CabGo
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-6xl font-black">
              🚕
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div><div className="font-bold text-lg">2 min</div><div className="text-muted-foreground">Avg wait</div></div>
              <div><div className="font-bold text-lg">4.9★</div><div className="text-muted-foreground">Rated</div></div>
              <div><div className="font-bold text-lg">24/7</div><div className="text-muted-foreground">Support</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 grid gap-8 md:grid-cols-3">
        {[
          { icon: <FiMapPin />, title: "Live tracking", body: "OpenStreetMap + OSRM routing, no proprietary lock-in." },
          { icon: <FiClock />, title: "Instant booking", body: "Enter pickup and drop — book with one click." },
          { icon: <FiShield />, title: "Secure by design", body: "JWT auth, role-based access, encrypted comms." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{f.icon}</div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
