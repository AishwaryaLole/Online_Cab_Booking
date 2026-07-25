import { useEffect, useState } from "react";
import { adminService } from "../../services/adminService";
import Loader from "../../components/common/Loader";

export default function Reports() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([adminService.bookingReport(), adminService.revenueReport(), adminService.driverReport()])
      .then(([b, r, d]) => setData({ bookings: b, revenue: r, drivers: d }))
      .catch(() => setData({ bookings: {}, revenue: {}, drivers: {} }));
  }, []);
  if (!data) return <Loader />;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {["bookings","revenue","drivers"].map((k) => (
          <div key={k} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold capitalize">{k}</h2>
            <div className="mt-3 space-y-1 text-sm">
              {Object.entries(data[k]).map(([kk, v]) => (
                <div key={kk} className="flex justify-between border-b border-border py-1 last:border-0">
                  <span className="text-muted-foreground capitalize">{kk}</span><span className="font-medium">{String(v)}</span>
                </div>
              ))}
              {Object.keys(data[k]).length === 0 && <div className="text-muted-foreground">No data.</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
