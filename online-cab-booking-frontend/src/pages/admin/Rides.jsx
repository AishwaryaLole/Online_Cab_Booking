import { useState } from "react";
import { rideService } from "../../services/rideService";
import { adminService } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Rides() {
  const [rideId, setRideId] = useState("");
  const [ride, setRide] = useState(null);
  const [reason, setReason] = useState("");

  const load = async () => { try { setRide(await rideService.getById(rideId)); } catch (e) { toast.error(e?.friendlyMessage || "Not found"); } };
  const cancel = async () => { try { await adminService.cancelRide(ride.id, reason || "Cancelled by admin"); toast.success("Cancelled"); load(); } catch (e) { toast.error(e?.friendlyMessage); } };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Rides</h1>
      <p className="text-xs text-muted-foreground mt-1">
        Backend exposes ride lookup by ID and admin cancellation only. A "list all rides" endpoint would let us render a full table.
      </p>
      <div className="mt-4 flex gap-2">
        <input value={rideId} onChange={(e) => setRideId(e.target.value)} placeholder="Ride ID"
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        <button onClick={load} className="rounded-lg bg-primary px-4 text-sm text-primary-foreground">Load</button>
      </div>
      {ride && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 space-y-2 text-sm">
          <div><b>Status:</b> {ride.status}</div>
          <div><b>Route:</b> {ride.pickupLocation} → {ride.dropLocation}</div>
          <div><b>Passenger:</b> #{ride.passengerId} · <b>Driver:</b> #{ride.driverId ?? "—"}</div>
          <div><b>Fare:</b> ₹{ride.fare ?? "—"}</div>
          {ride.status !== "CANCELLED" && ride.status !== "COMPLETED" && (
            <div className="mt-3 flex gap-2">
              <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Cancellation reason"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <button onClick={cancel} className="rounded-lg bg-destructive px-4 text-sm text-destructive-foreground">Cancel ride</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
