import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import RouteMap from "../../components/driver/RouteMap";

import {
  startRide,
  completeRide,
} from "../../services/driverService";

// How often (ms) the live-nav route line is allowed to recompute.
const ROUTE_RECOMPUTE_INTERVAL_MS = 8000;

const CurrentRide = () => {
  const location = useLocation();
  const ride = location.state?.ride;

  const [status, setStatus] = useState("ACCEPTED");
  const [driverPosition, setDriverPosition] = useState(null);

  const lastRouteComputeRef = useRef(0);
  const [routeOrigin, setRouteOrigin] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (locationEvent) => {
        const { latitude, longitude } = locationEvent.coords;
        const current = { lat: latitude, lng: longitude };

        setDriverPosition(current);

        const now = Date.now();
        if (now - lastRouteComputeRef.current < ROUTE_RECOMPUTE_INTERVAL_MS) {
          return;
        }
        lastRouteComputeRef.current = now;
        setRouteOrigin(current);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">No Active Ride Found</h2>
      </div>
    );
  }

  // NOTE: the backend's RideResponseDTO currently does not return
  // pickupLatitude/pickupLongitude/dropLatitude/dropLongitude — only
  // address strings (pickupLocation / dropLocation). Until that's added
  // on the backend, these will be undefined and no route line will draw.
  const pickupCoords =
    ride.pickupLatitude != null && ride.pickupLongitude != null
      ? { lat: ride.pickupLatitude, lng: ride.pickupLongitude }
      : null;

  const dropCoords =
    ride.dropLatitude != null && ride.dropLongitude != null
      ? { lat: ride.dropLatitude, lng: ride.dropLongitude }
      : null;

  const routeTarget = status === "STARTED" ? dropCoords : pickupCoords;
  const routeLabel =
    status === "STARTED" ? "Route to Destination" : "Route to Pickup";
  const hasRouteData = Boolean(routeTarget);

  const handleStartRide = async () => {
    try {
      await startRide(ride.id);
      setStatus("STARTED");
      lastRouteComputeRef.current = 0;
      if (driverPosition) setRouteOrigin(driverPosition);
      toast.success("Ride Started Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to start ride");
    }
  };

  const handleCompleteRide = async () => {
    try {
      await completeRide(ride.id);
      setStatus("COMPLETED");
      toast.success("Ride Completed Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Unable to complete ride");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🚕 Current Ride</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-5">Passenger Details</h2>

          <div className="space-y-3">
            <p><strong>Passenger:</strong> {ride.passengerName || "N/A"}</p>
            <p><strong>Phone:</strong> {ride.phone || "N/A"}</p>
            <p><strong>Pickup:</strong> {ride.pickupLocation || "N/A"}</p>
            <p><strong>Drop:</strong> {ride.dropLocation || "N/A"}</p>
            <p><strong>Fare:</strong> ₹{ride.fare ?? 0}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-blue-600 font-semibold">{status}</span>
            </p>
          </div>

          {status === "ACCEPTED" && (
            <button
              onClick={handleStartRide}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
            >
              Start Ride
            </button>
          )}

          {status === "STARTED" && (
            <button
              onClick={handleCompleteRide}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              Complete Ride
            </button>
          )}

          {status === "COMPLETED" && (
            <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl text-center font-semibold">
              Ride Completed 🎉
            </div>
          )}
        </div>

        <div>
          {status !== "COMPLETED" && (
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  driverPosition ? "bg-green-500" : "bg-gray-400"
                } animate-pulse`}
              />
              <span className="font-semibold text-gray-700">{routeLabel}</span>
              {!driverPosition && (
                <span className="text-sm text-gray-400">(waiting for GPS...)</span>
              )}
            </div>
          )}

          {!hasRouteData && status !== "COMPLETED" && (
            <div className="mb-3 bg-yellow-50 text-yellow-700 text-sm px-4 py-2 rounded-lg">
              No route to draw — this ride has no pickup/drop coordinates
              from the backend yet, only address text.
            </div>
          )}

          <RouteMap
            pickup={pickupCoords}
            drop={dropCoords}
            driverLocation={driverPosition}
            routeFrom={status === "COMPLETED" ? null : routeOrigin || driverPosition}
            routeTo={status === "COMPLETED" ? null : routeTarget}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentRide;