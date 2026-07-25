import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { driverService } from "../../services/driverService";
import { toast } from "react-toastify";
import MapView from "../../components/common/MapView";

export default function DriverDashboard() {
  const { user } = useAuth();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLoc] = useState(null);

  const driverId = user?.id;

  useEffect(() => {
    if (!driverId) { setLoading(false); return; }
    driverService.getById(driverId).then(setDriver).catch(() => {}).finally(() => setLoading(false));
  }, [driverId]);

  const toggleAvail = async () => {
    if (!driver) return;
    const next = driver.status === "APPROVED" ? "PENDING" : "APPROVED";
    try {
      const upd = await driverService.setAvailability(driverId, { driverId, status: next });
      setDriver({ ...driver, status: upd?.status || next });
      toast.success("Availability updated");
    } catch (e) { toast.error(e?.friendlyMessage || "Failed"); }
  };

  const shareLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLoc([latitude, longitude]);
      try {
        await driverService.updateLocation(driverId, { driverId, latitude, longitude });
        toast.success("Location shared");
      } catch (e) { toast.error(e?.friendlyMessage || "Failed"); }
    }, () => toast.error("Location permission denied"));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Driver dashboard</h1>
      <p className="text-muted-foreground">{user?.email}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="mt-2 text-2xl font-bold">{driver?.status || (loading ? "…" : "UNKNOWN")}</div>
          <button onClick={toggleAvail} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground">
            Toggle availability
          </button>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">Vehicle</div>
          <div className="mt-2 font-medium">{driver?.vehicle?.model || "—"}</div>
          <div className="text-sm text-muted-foreground">{driver?.vehicle?.vehicleNumber || ""}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">License</div>
          <div className="mt-2 font-medium">{driver?.licenseNumber || "—"}</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your current location</h2>
          <button onClick={shareLocation} className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground">
            Update location
          </button>
        </div>
        <div className="mt-4">
          <MapView driver={location || (driver?.location ? [driver.location.latitude, driver.location.longitude] : null)} height={360} />
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Note: the backend does not currently expose a "driver ride-requests" listing endpoint. Once available, wire it into
        <code className="mx-1 rounded bg-muted px-1">driverService</code> and the requests page will show live requests.
      </p>
    </div>
  );
}
