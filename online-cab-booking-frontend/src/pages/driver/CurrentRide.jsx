import { useState } from "react";
import { rideService } from "../../services/rideService";
import { toast } from "react-toastify";
import MapView from "../../components/common/MapView";

export default function DriverCurrentRide() {
  const [rideId, setRideId] = useState("");
  const [ride, setRide] = useState(null);

  const fetchIt = async () => {
    try { setRide(await rideService.getById(rideId)); } catch (e) { toast.error(e?.friendlyMessage || "Not found"); }
  };
  const start = async () => { const r = await rideService.start(ride.id); setRide(r); toast.success("Ride started"); };
  const complete = async () => { const r = await rideService.complete(ride.id); setRide(r); toast.success("Ride completed"); };

  const pickup = ride?.pickupLatitude && ride?.pickupLongitude ? [ride.pickupLatitude, ride.pickupLongitude] : null;
  const drop = ride?.dropLatitude && ride?.dropLongitude ? [ride.dropLatitude, ride.dropLongitude] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Current ride</h1>
      <div className="mt-4 flex gap-2">
        <input value={rideId} onChange={(e) => setRideId(e.target.value)} placeholder="Enter ride ID"
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        <button onClick={fetchIt} className="rounded-lg bg-primary px-4 text-sm text-primary-foreground">Load</button>
      </div>

      {ride && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{ride.status}</div>
            <div className="text-sm"><span className="text-muted-foreground">From:</span> {ride.pickupLocation}</div>
            <div className="text-sm"><span className="text-muted-foreground">To:</span> {ride.dropLocation}</div>
            <div className="text-sm"><span className="text-muted-foreground">Distance:</span> {ride.distanceKm?.toFixed?.(2) ?? "—"} km</div>
            <div className="flex gap-2 pt-2">
              {["ACCEPTED","ASSIGNED"].includes(ride.status) && (
                <button onClick={start} className="flex-1 rounded-lg bg-primary py-2 text-sm text-primary-foreground">Start ride</button>
              )}
              {ride.status === "IN_PROGRESS" && (
                <button onClick={complete} className="flex-1 rounded-lg bg-primary py-2 text-sm text-primary-foreground">Complete ride</button>
              )}
            </div>
          </div>
          <MapView pickup={pickup} drop={drop} height={500} />
        </div>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        Backend has no "get active ride for driver" endpoint. Enter the ride ID manually or add
        <code className="mx-1 rounded bg-muted px-1">GET /api/rides/active?driverId=...</code> to auto-load it.
      </p>
    </div>
  );
}
