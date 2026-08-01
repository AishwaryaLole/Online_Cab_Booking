import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { getDriverByUserId, updateDriverLocation } from "../../services/driverService";
import MapView from "../../components/map/MapView";
import SearchLocation from "../../components/map/SearchLocation";

export default function Location() {
  const { userId } = useAuth();
  const { getCurrentLocation, loading: gpsLoading } = useCurrentLocation();

  const [driverId, setDriverId] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDriver = async () => {
      const res = await getDriverByUserId(userId);
      if (res.success) {
        setDriverId(res.data.id);
        setLatitude(res.data.location?.latitude ?? 12.9716);
        setLongitude(res.data.location?.longitude ?? 77.5946);
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    };
    loadDriver();
  }, [userId]);

  const handleUpdate = async (lat = latitude, lng = longitude) => {
    setSaving(true);
    const res = await updateDriverLocation(driverId, lat, lng);
    setSaving(false);
    res.success ? toast.success(res.message || "Location updated") : toast.error(res.message);
  };

  const handleUseCurrentLocation = async () => {
    try {
      const loc = await getCurrentLocation();
      setLatitude(loc.latitude);
      setLongitude(loc.longitude);
      handleUpdate(loc.latitude, loc.longitude);
    } catch (err) {
      toast.error(err || "Could not get current location");
    }
  };

  const handlePlaceSelect = (place) => {
    setLatitude(place.latitude);
    setLongitude(place.longitude);
  };

  const handleMarkerDrag = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  if (loading) return <p className="p-6 text-gray-500">Loading location...</p>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Driver location</h1>
      <p className="text-gray-500 text-sm mb-6">Share your live location with dispatch.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <SearchLocation placeholder="Search location..." onSelect={handlePlaceSelect} />

          <div>
            <label className="text-xs font-semibold text-gray-500">Latitude</label>
            <input value={latitude ?? ""} onChange={(e) => setLatitude(parseFloat(e.target.value))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500">Longitude</label>
            <input value={longitude ?? ""} onChange={(e) => setLongitude(parseFloat(e.target.value))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>

          <div className="flex gap-3">
            <button onClick={() => handleUpdate()} disabled={saving}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-60">
              {saving ? "Updating..." : "Update location"}
            </button>
            <button onClick={handleUseCurrentLocation} disabled={gpsLoading}
              className="border border-gray-200 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50">
              {gpsLoading ? "Locating..." : "Use current location"}
            </button>
          </div>
        </div>

        <MapView latitude={latitude} longitude={longitude} draggable onMarkerDrag={handleMarkerDrag} height="420px" />
      </div>
    </div>
  );
}