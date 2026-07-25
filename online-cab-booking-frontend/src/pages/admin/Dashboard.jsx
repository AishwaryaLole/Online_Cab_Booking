import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import { driverService } from "../../services/driverService";
import { motion } from "framer-motion";
import { FiUsers, FiTruck, FiMapPin, FiDollarSign } from "react-icons/fi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, drivers: 0, bookings: {}, revenue: {}, driverReport: {} });
  useEffect(() => {
    Promise.all([
      adminService.listUsers().catch(() => []),
      driverService.list().catch(() => []),
      adminService.bookingReport().catch(() => ({})),
      adminService.revenueReport().catch(() => ({})),
      adminService.driverReport().catch(() => ({})),
    ]).then(([users, drivers, bookings, revenue, driverReport]) =>
      setStats({ users: users.length, drivers: drivers.length, bookings, revenue, driverReport })
    );
  }, []);

  const totalRides = stats.bookings.totalRides ?? stats.bookings.total ?? "—";
  const completed = stats.bookings.completed ?? "—";
  const cancelled = stats.bookings.cancelled ?? "—";
  const totalRevenue = stats.revenue.totalRevenue ?? stats.revenue.total ?? "—";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
        Admin dashboard
      </motion.h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card icon={<FiUsers />} label="Total users" value={stats.users} />
        <Card icon={<FiTruck />} label="Total drivers" value={stats.drivers} />
        <Card icon={<FiMapPin />} label="Total rides" value={totalRides} />
        <Card icon={<FiDollarSign />} label="Revenue" value={typeof totalRevenue === "number" ? `₹${totalRevenue}` : totalRevenue} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Panel title="Booking report">
          <Row label="Completed" value={completed} />
          <Row label="Cancelled" value={cancelled} />
          {Object.entries(stats.bookings).filter(([k]) => !["totalRides","total","completed","cancelled"].includes(k))
            .map(([k, v]) => <Row key={k} label={k} value={String(v)} />)}
        </Panel>
        <Panel title="Driver report">
          {Object.entries(stats.driverReport).map(([k, v]) => <Row key={k} label={k} value={String(v)} />)}
          {Object.keys(stats.driverReport).length === 0 && <p className="text-sm text-muted-foreground">No data.</p>}
        </Panel>
      </div>
    </div>
  );
}
function Card({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div><div className="text-2xl font-bold">{value}</div><div className="text-xs text-muted-foreground">{label}</div></div>
      </div>
    </div>
  );
}
function Panel({ title, children }) {
  return <div className="rounded-2xl border border-border bg-card p-6"><h2 className="text-lg font-semibold mb-3">{title}</h2><div className="space-y-2 text-sm">{children}</div></div>;
}
function Row({ label, value }) {
  return <div className="flex justify-between border-b border-border pb-1 last:border-0"><span className="text-muted-foreground capitalize">{label}</span><span className="font-medium">{value}</span></div>;
}
