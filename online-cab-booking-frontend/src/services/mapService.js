// Search Location using Nominatim
export const searchLocation = async (query) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(query)}`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Get Route using OSRM
export const getRoute = async (
  pickupLat,
  pickupLng,
  dropLat,
  dropLng
) => {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${pickupLng},${pickupLat};${dropLng},${dropLat}?overview=full&geometries=geojson`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};