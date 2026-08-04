import axios from "axios";
import { NOMINATIM_URL, OSRM_URL } from "../utils/constants";

// Search place by name
export const searchLocation = async (query) => {
  try {
    if (!query || query.trim().length < 3) {
      return [];
    }

    const res = await axios.get(`${NOMINATIM_URL}/search`, {
      params: {
        q: query,
        format: "json",
        limit: 8,
        addressdetails: 1,
        countrycodes: "in",
      },
    });

    const results = res.data || [];

    // Prefer actual places (city/town/village/suburb) over broad
    // administrative boundaries (districts/states), since a district
    // centroid can be far from the real place someone means.
    const realPlaces = results.filter(
      (place) => !(place.class === "boundary" && place.type === "administrative")
    );

    return realPlaces.length > 0 ? realPlaces.slice(0, 5) : results.slice(0, 5);
  } catch (error) {
    console.error("Location search failed:", error);
    return [];
  }
};

// Reverse Geocoding
export const reverseGeocode = async (lat, lon) => {
  try {
    const res = await axios.get(`${NOMINATIM_URL}/reverse`, {
      params: {
        lat,
        lon,
        format: "json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Reverse geocode failed:", error);
    return null;
  }
};

// Get route using OSRM
export const getRoute = async (
  pickupLat,
  pickupLng,
  dropLat,
  dropLng
) => {
  try {
    const url = `${OSRM_URL}/route/v1/driving/${pickupLng},${pickupLat};${dropLng},${dropLat}`;

    const res = await axios.get(url, {
      params: {
        overview: "full",
        geometries: "geojson",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Route calculation failed:", error);
    return null;
  }
};