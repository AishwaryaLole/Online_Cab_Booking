import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons for leaflet + bundlers
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const driverIcon = L.divIcon({
  className: "",
  html: `<div style="background:#f59e0b;border:2px solid white;border-radius:9999px;width:18px;height:18px;box-shadow:0 0 0 2px rgba(0,0,0,0.15)"></div>`,
  iconSize: [18, 18], iconAnchor: [9, 9],
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points?.length) return;
    const bounds = L.latLngBounds(points);
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

export default function MapView({
  pickup, drop, driver, route, height = 380, center,
}) {
  const initialCenter = center || pickup || drop || driver || [20.5937, 78.9629]; // India centroid
  const points = useMemo(() => [pickup, drop, driver].filter(Boolean), [pickup, drop, driver]);
  const mapRef = useRef(null);

  return (
    <div className="overflow-hidden rounded-xl border border-border" style={{ height }}>
      <MapContainer center={initialCenter} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pickup && <Marker position={pickup} />}
        {drop && <Marker position={drop} />}
        {driver && <Marker position={driver} icon={driverIcon} />}
        {route?.length > 1 && <Polyline positions={route} pathOptions={{ color: "#f59e0b", weight: 5 }} />}
        <FitBounds points={route?.length ? route : points} />
      </MapContainer>
    </div>
  );
}
