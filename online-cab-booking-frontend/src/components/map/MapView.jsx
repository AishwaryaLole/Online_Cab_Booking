import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { driverIcon } from "./DriverMarker";
import { dropIcon } from "./DropMarker";

function Recenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], map.getZoom());
  }, [lat, lng]);
  return null;
}

export default function MapView({
  latitude,
  longitude,
  dropLatitude,
  dropLongitude,
  routeCoordinates,
  draggable = false,
  onMarkerDrag,
  height = "300px",
}) {
  if (!latitude || !longitude) {
    return (
      <div style={{ height }} className="flex items-center justify-center bg-gray-100 rounded-xl text-gray-400 text-sm">
        Loading map...
      </div>
    );
  }

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-gray-200">
      <MapContainer center={[latitude, longitude]} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[latitude, longitude]}
          icon={driverIcon}
          draggable={draggable}
          eventHandlers={
            draggable
              ? { dragend: (e) => { const { lat, lng } = e.target.getLatLng(); onMarkerDrag && onMarkerDrag(lat, lng); } }
              : {}
          }
        />
        {dropLatitude && dropLongitude && <Marker position={[dropLatitude, dropLongitude]} icon={dropIcon} />}
        {routeCoordinates && routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} color="#6366f1" weight={4} />
        )}
        <Recenter lat={latitude} lng={longitude} />
      </MapContainer>
    </div>
  );
}