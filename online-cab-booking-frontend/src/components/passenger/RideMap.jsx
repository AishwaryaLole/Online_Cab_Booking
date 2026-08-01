import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// India's approximate bounding box - keeps the map focused on India.
const INDIA_CENTER = [22.9734, 78.6569];
const INDIA_BOUNDS = [
  [6.0, 68.0],
  [38.0, 98.0],
];

const pickupIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#7c3aed;border:3px solid white;box-shadow:0 0 0 2px #7c3aed;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const dropIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 0 0 2px #ef4444;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Keeps the map view synced to the pickup/drop points whenever they change.
function FitToRoute({ pickup, drop, routeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (pickup && drop) {
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [drop.lat, drop.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60] });
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], 13);
    } else if (drop) {
      map.setView([drop.lat, drop.lng], 13);
    }
  }, [pickup, drop, routeCoords, map]);

  return null;
}

export default function RideMap({ pickup, drop, routeCoords = [] }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        minZoom={4}
        maxBounds={INDIA_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon} />
        )}
        {drop && <Marker position={[drop.lat, drop.lng]} icon={dropIcon} />}

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="#7c3aed" weight={4} />
        )}

        <FitToRoute pickup={pickup} drop={drop} routeCoords={routeCoords} />
      </MapContainer>
    </div>
  );
}
