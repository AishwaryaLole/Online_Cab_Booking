import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { updateDriverLocation } from "../../services/driverService";
import { Navigation, MapPin } from "lucide-react";

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component to center map smoothly
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
};

const LiveDriverMap = ({ activeRide }) => {
  const driverId = localStorage.getItem("driverId") || 1;
  const [position, setPosition] = useState([16.705, 74.243]); // Default location
  const [gpsActive, setGpsActive] = useState(false);

  // Watch Driver's Live Location via HTML5 Geolocation API
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setGpsActive(true);

        // Ping location to backend API
        updateDriverLocation(driverId, latitude, longitude).catch((err) =>
          console.error("Auto-location sync failed:", err)
        );
      },
      (err) => {
        console.error("GPS Error:", err);
        setGpsActive(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [driverId]);

  // Extract pickup & dropoff coordinates if available
  const pickupCoords = activeRide?.pickupLat && activeRide?.pickupLng
    ? [activeRide.pickupLat, activeRide.pickupLng]
    : null;

  const dropCoords = activeRide?.dropLat && activeRide?.dropLng
    ? [activeRide.dropLat, activeRide.dropLng]
    : null;

  // Polyline points
  const routePoints = [
    position,
    ...(pickupCoords ? [pickupCoords] : []),
    ...(dropCoords ? [dropCoords] : []),
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-indigo-600" /> Live Driver Navigation
        </h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            gpsActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {gpsActive ? "● GPS Active" : "Simulated / Static GPS"}
        </span>
      </div>

      <div className="h-72 w-full rounded-lg overflow-hidden border border-gray-200">
        <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RecenterAutomatically lat={position[0]} lng={position[1]} />

          {/* Current Driver Position */}
          <Marker position={position}>
            <Popup>You are here (Driver Location)</Popup>
          </Marker>

          {/* Pickup Marker */}
          {pickupCoords && (
            <Marker position={pickupCoords}>
              <Popup>Pickup Location</Popup>
            </Marker>
          )}

          {/* Dropoff Marker */}
          {dropCoords && (
            <Marker position={dropCoords}>
              <Popup>Destination Location</Popup>
            </Marker>
          )}

          {/* Polyline Route */}
          {routePoints.length > 1 && (
            <Polyline positions={routePoints} color="#4F46E5" weight={4} dashArray="5, 10" />
          )}
        </MapContainer>
      </div>

      {activeRide && (
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="truncate"><strong>Pickup:</strong> {activeRide.pickupLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="truncate"><strong>Drop:</strong> {activeRide.dropLocation}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveDriverMap;