import { useEffect, useState } from "react";
import { driverService } from "../../services/driverService";
import Loader from "../../components/common/Loader";

export default function Vehicles() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { driverService.list().then(setDrivers).finally(() => setLoading(false)); }, []);
  const vehicles = drivers.map((d) => d.vehicle).filter(Boolean);
  if (loading) return <Loader />;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Vehicles</h1>
      <p className="text-xs text-muted-foreground mt-1">
        No standalone vehicle endpoints exist — vehicles are managed through drivers (<code>PUT /api/drivers/{"{id}"}</code>).
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr>
            <th className="p-3">ID</th><th className="p-3">Number</th><th className="p-3">Type</th><th className="p-3">Model</th><th className="p-3">Color</th><th className="p-3">Driver</th>
          </tr></thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="p-3">#{v.id}</td><td className="p-3">{v.vehicleNumber}</td><td className="p-3">{v.vehicleType}</td>
                <td className="p-3">{v.model}</td><td className="p-3">{v.color}</td><td className="p-3">#{v.driverId}</td>
              </tr>
            ))}
            {vehicles.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No vehicles registered.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
