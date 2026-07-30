import { useState } from "react";

import BookRideForm from "../../components/passenger/BookRideForm";
import FareEstimate from "../../components/passenger/FareEstimate";
import RideConfirmation from "../../components/passenger/RideConfirmation";
import RideMap from "../../components/map/RideMap";

function BookRide() {

  // Ride Details
  const [rideData, setRideData] = useState({
    pickup: "",
    drop: "",

    pickupLat: null,
    pickupLng: null,

    dropLat: null,
    dropLng: null,

    fare: 250,
    distance: 0,
    duration: 0,
  });

  // Show Fare + Confirmation
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  // Update Ride Data
  const handleRideData = (data) => {
    setRideData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Continue Button
  const handleContinue = () => {
    setShowBookingDetails(true);
  };

  // Confirm Ride
  const handleConfirmRide = () => {

    console.log("Ride Booked");

    console.log(rideData);

    alert("Ride Booking API will be connected in next step.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">
        Book a Ride
      </h1>

      <p className="text-gray-500 mb-6">
        Search your pickup and drop locations.
      </p>

      {/* Booking Form */}
      <BookRideForm
        rideData={rideData}
        setRideData={handleRideData}
        onContinue={handleContinue}
      />

      {/* Map */}
      <RideMap
        rideData={rideData}
      />

      {/* Fare + Confirmation */}
      {showBookingDetails && (

        <>

          <FareEstimate
            fare={rideData.fare}
            distance={rideData.distance}
            duration={rideData.duration}
          />

          <RideConfirmation
            pickup={rideData.pickup}
            drop={rideData.drop}
            fare={rideData.fare}
            onConfirm={handleConfirmRide}
          />

        </>

      )}

    </div>
  );
}

export default BookRide;