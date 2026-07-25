import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { driverService } from "../../services/driverService";
import Loader from "../../components/common/Loader";

export default function DriverProfile() {
  const { user } = useAuth();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    driverService.getById(user.id).then(setDriver).catch(() => {}).finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold">Driver profile</h1>
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 space-y-3">
        <Row label="Email" value={user?.email} />
        <Row label="Driver ID" value={driver?.id} />
        <Row label="Status" value={driver?.status} />
        <Row label="License" value={driver?.licenseNumber} />
        <Row label="Vehicle" value={driver?.vehicle ? `${driver.vehicle.model} · ${driver.vehicle.vehicleNumber}` : "—"} />
      </div>
    </div>
  );
}
function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-border pb-2 last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}
