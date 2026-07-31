import React, { useEffect, useRef } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Driver custom icon
const driverIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
  iconSize: [40, 40],
});

// Routing Component
// Draws the path between `from` and `to` — decoupled from the pickup/drop
// markers below, so the route can live-navigate from the driver's current
// GPS position while the pickup/drop pins still show the real addresses.
const Routing = ({ from, to }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 6 }],
      },
    })
      .on("routesfound", function (e) {
        const routes = e.routes;
        const bounds = L.latLngBounds(routes[0].coordinates);
        map.fitBounds(bounds, { padding: [50, 50] });
      })
      .addTo(map);

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
      }
    };
  }, [from, to, map]);

  return null;
};

const RouteMap = ({
  pickup,
  drop,
  driverLocation,

  // Optional: explicit route endpoints, decoupled from the pickup/drop
  // markers. Falls back to pickup/drop if not provided.
  routeFrom,
  routeTo,
}) => {
  const center =
    driverLocation ||
    pickup ||
    { lat: 18.5204, lng: 73.8567 };

  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={14}
        className="w-full h-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {driverLocation && (
          <Marker
            position={[driverLocation.lat, driverLocation.lng]}
            icon={driverIcon}
          >
            <Popup>🚕 Driver Current Location</Popup>
          </Marker>
        )}

        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]}>
            <Popup>📍 Pickup Location</Popup>
          </Marker>
        )}

        {drop && (
          <Marker position={[drop.lat, drop.lng]}>
            <Popup>🏁 Drop Location</Popup>
          </Marker>
        )}

        {(routeFrom || pickup) && (routeTo || drop) && (
          <Routing from={routeFrom || pickup} to={routeTo || drop} />
        )}
      </MapContainer>
    </div>
  );
};

export default RouteMap;