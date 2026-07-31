import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { updateDriverLocation } from "../../services/driverService";

// Minimum time between location updates sent to the backend (ms).
// GPS can fire every 1-2s; we don't want to PUT that often.
const LOCATION_SYNC_INTERVAL_MS = 10000;

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);

  return null;
}

const DriverMap = () => {
  const [position, setPosition] = useState([
    18.5204,
    73.8567,
  ]); // Default: Pune

  const lastSyncRef = useRef(0);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;

        setPosition([latitude, longitude]);

        // Throttle: only push to backend every LOCATION_SYNC_INTERVAL_MS
        const now = Date.now();
        if (now - lastSyncRef.current < LOCATION_SYNC_INTERVAL_MS) return;
        lastSyncRef.current = now;

        // Temporary: using Driver ID = 1
        // Replace with logged-in driver ID once login is wired up
        updateDriverLocation(1, latitude, longitude).catch((error) => {
          // Non-fatal — don't disrupt the map if the sync fails
          console.error("Failed to sync location to backend:", error);
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">
          Current Location
        </h2>

        <p className="text-gray-500">
          Live GPS Tracking
        </p>
      </div>

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[500px] w-full"
      >
        <ChangeMapView center={position} />

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            You are here
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
};

export default DriverMap;