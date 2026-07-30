import { useState } from "react";
import { searchLocation } from "../../services/mapService";

function BookRideForm({
  rideData,
  setRideData,
  onContinue,
}) {
  const [pickupResults, setPickupResults] = useState([]);
  const [dropResults, setDropResults] = useState([]);

  const handlePickupSearch = async (value) => {
  setRideData({
    pickup: value,
  });

  if (value.trim().length < 3) {
    setPickupResults([]);
    return;
  }

  const results = await searchLocation(value);

  console.log("Pickup Results:", results); // <-- Add this

  setPickupResults(results.slice(0, 5));
};


  // Search Drop
  const handleDropSearch = async (value) => {
  setRideData({
    drop: value,
  });

  if (value.trim().length < 3) {
    setDropResults([]);
    return;
  }

  const results = await searchLocation(value);

  console.log("Drop Results:", results); // <-- Add this

  setDropResults(results.slice(0, 5));
  };
  // Continue Button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !rideData.pickup ||
      !rideData.drop ||
      !rideData.pickupLat ||
      !rideData.pickupLng ||
      !rideData.dropLat ||
      !rideData.dropLng
    ) {
      alert("Please select Pickup and Drop from the suggestions.");
      return;
    }

    onContinue();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Pickup */}
        <div>

          <label className="block font-semibold mb-2">
            Pickup Location
          </label>

          <input
            type="text"
            value={rideData.pickup}
            placeholder="Search Pickup"
            onChange={(e) => handlePickupSearch(e.target.value)}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {pickupResults.length > 0 && (

            <div className="mt-2 rounded-xl border bg-white shadow max-h-60 overflow-y-auto">

              {pickupResults.map((place) => (

                <div
                  key={place.place_id}
                  className="p-3 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {

                    setRideData({
                      pickup: place.display_name,
                      pickupLat: Number(place.lat),
                      pickupLng: Number(place.lon),
                    });

                    setPickupResults([]);

                  }}
                >
                  {place.display_name}
                </div>

              ))}

            </div>

          )}

        </div>

        {/* Drop */}
        <div>

          <label className="block font-semibold mb-2">
            Drop Location
          </label>

          <input
            type="text"
            value={rideData.drop}
            placeholder="Search Drop"
            onChange={(e) => handleDropSearch(e.target.value)}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {dropResults.length > 0 && (

            <div className="mt-2 rounded-xl border bg-white shadow max-h-60 overflow-y-auto">

              {dropResults.map((place) => (

                <div
                  key={place.place_id}
                  className="p-3 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {

                    setRideData({
                      drop: place.display_name,
                      dropLat: Number(place.lat),
                      dropLng: Number(place.lon),
                    });

                    setDropResults([]);

                  }}
                >
                  {place.display_name}
                </div>

              ))}

            </div>

          )}

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Continue
        </button>

      </form>

    </div>
  );
}

export default BookRideForm;