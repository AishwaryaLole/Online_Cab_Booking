import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getRoute } from "../../services/mapService";

// Leaflet Marker Icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Marker Icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Change Map Center
function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);

  return null;
}

function RideMap({ rideData, setRideData }) {
  // Default India Location
  const [currentLocation, setCurrentLocation] = useState([
    20.5937,
    78.9629,
  ]);

  // Route Coordinates
  const [route, setRoute] = useState([]);

  // Distance
  const [distance, setDistance] = useState(0);

  // ETA
  const [duration, setDuration] = useState(0);

  // Current Location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // Load Route
  useEffect(() => {
    const loadRoute = async () => {
      if (
        !rideData.pickupLat ||
        !rideData.pickupLng ||
        !rideData.dropLat ||
        !rideData.dropLng
      ) {
        setRoute([]);
        setDistance(0);
        setDuration(0);
        return;
      }

      try {
        const data = await getRoute(
          rideData.pickupLat,
          rideData.pickupLng,
          rideData.dropLat,
          rideData.dropLng
        );

        if (!data || !data.routes || data.routes.length === 0) {
          return;
        }

        // Route Coordinates
        const coordinates = data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );

        setRoute(coordinates);

        // Distance in KM
        const distanceKm = Number(
          (data.routes[0].distance / 1000).toFixed(2)
        );

        // Duration in Minutes
        const durationMin = Math.ceil(
          data.routes[0].duration / 60
        );

        // Fare Calculation
        // ₹15 per KM
        const fare = Math.round(distanceKm * 15);

        console.log("Distance:", distanceKm);
        console.log("Duration:", durationMin);
        console.log("Fare:", fare);

        setDistance(distanceKm);
        setDuration(durationMin);

        // Update parent state
       setRideData({
          distance: distanceKm,
          duration: durationMin,
          fare: fare,
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadRoute();
  }, [
    rideData.pickupLat,
    rideData.pickupLng,
    rideData.dropLat,
    rideData.dropLng,
    setRideData,
  ]);

  // Map Center
  const mapCenter =
    rideData.pickupLat && rideData.pickupLng
      ? [rideData.pickupLat, rideData.pickupLng]
      : currentLocation;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Ride Map
      </h2>

      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-xl"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView center={mapCenter} />

        {!rideData.pickupLat && (
          <Marker position={currentLocation}>
            <Popup>Current Location</Popup>
          </Marker>
        )}

        {rideData.pickupLat && rideData.pickupLng && (
          <Marker
            position={[
              rideData.pickupLat,
              rideData.pickupLng,
            ]}
          >
            <Popup>Pickup Location</Popup>
          </Marker>
        )}

        {rideData.dropLat && rideData.dropLng && (
          <Marker
            position={[
              rideData.dropLat,
              rideData.dropLng,
            ]}
          >
            <Popup>Drop Location</Popup>
          </Marker>
        )}

        {route.length > 0 && (
          <Polyline
            positions={route}
            pathOptions={{
              color: "blue",
              weight: 5,
            }}
          />
        )}
      </MapContainer>

      {route.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="bg-blue-100 rounded-xl p-5 shadow">
            <h3 className="text-lg font-semibold text-blue-700">
              Distance
            </h3>

            <p className="text-2xl font-bold text-blue-900 mt-2">
              {distance} km
            </p>
          </div>

          <div className="bg-green-100 rounded-xl p-5 shadow">
            <h3 className="text-lg font-semibold text-green-700">
              Estimated Time
            </h3>

            <p className="text-2xl font-bold text-green-900 mt-2">
              {duration} min
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RideMap;