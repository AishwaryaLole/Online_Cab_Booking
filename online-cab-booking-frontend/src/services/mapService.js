import axios from "axios";
import { NOMINATIM_URL, OSRM_URL } from "../utils/constants";

// Search place by name (Nominatim geocoding)
export const searchPlace = async (query) => {
  try {
    const res = await axios.get(`${NOMINATIM_URL}/search`, {
      params: { q: query, format: "json", limit: 5, addressdetails: 1 },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Location search failed" };
  }
};

// Convert lat/lon to address (Nominatim reverse geocoding)
export const reverseGeocode = async (lat, lon) => {
  try {
    const res = await axios.get(`${NOMINATIM_URL}/reverse`, {
      params: { lat, lon, format: "json" },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Reverse geocode failed" };
  }
};

// Road distance/time/route between two points (OSRM)
export const getRoute = async (start, end) => {
  try {
    const url = `${OSRM_URL}/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}`;
    const res = await axios.get(url, { params: { overview: "full", geometries: "geojson" } });
    const route = res.data.routes[0];
    return {
      success: true,
      distanceKm: +(route.distance / 1000).toFixed(2),
      durationMin: Math.ceil(route.duration / 60),
      coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    };
  } catch (error) {
    return { success: false, message: "Route calculation failed" };
  }
};