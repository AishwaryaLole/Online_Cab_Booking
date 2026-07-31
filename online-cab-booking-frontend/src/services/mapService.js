// Search Location using Nominatim
// Search Location using Nominatim
export const searchLocation = async (query) => {
  try {
    if (!query || query.trim().length < 3) {
      return [];
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&limit=5&q=${encodeURIComponent(query)}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Nominatim Error:", response.status);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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