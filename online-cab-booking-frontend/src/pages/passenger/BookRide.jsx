import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookRideForm from "../../components/passenger/BookRideForm";
import FareEstimate from "../../components/passenger/FareEstimate";
import RideConfirmation from "../../components/passenger/RideConfirmation";
import RideMap from "../../components/map/RideMap";
import { bookRide } from "../../services/passengerService";

function BookRide() {

  const navigate = useNavigate();

  // Ride Details
  const [rideData, setRideData] = useState({
    pickup: "",
    drop: "",

    pickupLat: null,
    pickupLng: null,

    dropLat: null,
    dropLng: null,

    fare: 0,
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
    const handleConfirmRide = async () => {
  try {

    const request = {
      passengerId: 2,

      pickupLocation: rideData.pickup,
      pickupLatitude: rideData.pickupLat,
      pickupLongitude: rideData.pickupLng,

      dropLocation: rideData.drop,
      dropLatitude: rideData.dropLat,
      dropLongitude: rideData.dropLng,
    };

    console.log("Request:", request);

    const response = await bookRide(request);

    // Save ride id
    localStorage.setItem("rideId", response.data.id);

    // Save estimated details
    localStorage.setItem("estimatedFare", rideData.fare);
    localStorage.setItem("estimatedDistance", rideData.distance);
    localStorage.setItem("estimatedDuration", rideData.duration);

    alert(response.message);

    // Navigate to Payment page
    navigate("/passenger/payment", {
      state: {
        rideId: response.data.id,
      },
    });

  

  } catch (error) {
    console.error(error);
    alert("Unable to book ride.");
  }
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
        setRideData={handleRideData}
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