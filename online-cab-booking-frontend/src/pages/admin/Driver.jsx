import { useEffect, useState } from "react";
import { driverService } from "../../services/driverService";
import { adminService } from "../../services/adminService";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => { setLoading(true); driverService.list().then(setDrivers).finally(() => setLoading(false)); };
  useEffect(load, []);

  const approve = async (id) => { try { await adminService.approveDriver(id); toast.success("Approved"); load(); } catch (e) { toast.error(e?.friendlyMessage); } };
  const block = async (id) => { try { await adminService.blockDriver(id); toast.success("Blocked"); load(); } catch (e) { toast.error(e?.friendlyMessage); } };
  const remove = async (id) => { if (!confirm("Delete driver?")) return; try { await driverService.delete(id); toast.success("Deleted"); load(); } catch (e) { toast.error(e?.friendlyMessage); } };

  if (loading) return <Loader />;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Drivers</h1>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr>
            <th className="p-3">ID</th><th className="p-3">User</th><th className="p-3">License</th>
            <th className="p-3">Status</th><th className="p-3">Vehicle</th><th className="p-3"></th>
          </tr></thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="p-3">#{d.id}</td><td className="p-3">#{d.userId}</td><td className="p-3">{d.licenseNumber}</td>
                <td className="p-3"><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{d.status}</span></td>
                <td className="p-3">{d.vehicle ? `${d.vehicle.model} · ${d.vehicle.vehicleNumber}` : "—"}</td>
                <td className="p-3 text-right space-x-1">
                  <button onClick={() => approve(d.id)} className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">Approve</button>
                  <button onClick={() => block(d.id)} className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">Block</button>
                  <button onClick={() => remove(d.id)} className="rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground">Delete</button>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No drivers.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
