import { useEffect, useState } from "react";
import {
  getRideById,
  makePayment,
} from "../../services/passengerService";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [ride, setRide] = useState(null);

  const rideId = localStorage.getItem("rideId");

  const estimatedFare = localStorage.getItem("estimatedFare");
  const estimatedDistance = localStorage.getItem("estimatedDistance");
  const estimatedDuration = localStorage.getItem("estimatedDuration");

  useEffect(() => {
    fetchRide();
  }, []);

  const fetchRide = async () => {
    try {
      const response = await getRideById(rideId);

      if (response.success) {
        setRide({
          ...response.data,
          fare: response.data.fare ?? Number(estimatedFare),
          distanceKm:
            response.data.distanceKm ?? Number(estimatedDistance),
          durationMin:
            response.data.durationMin ?? Number(estimatedDuration),
        });
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load ride details.");
    }
  };

  const handlePayment = async () => {
    try {
      const request = {
        rideId: ride.id,
        paymentMethod: paymentMethod,
        paymentStatus: "SUCCESS",
        amount: ride.fare,
      };

      console.log(request);

      const response = await makePayment(request);

      alert(response.message);
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Payment
        </h1>

        <p className="text-gray-500 mb-8">
          Select your payment method.
        </p>

        <div className="bg-blue-50 rounded-xl p-5 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Ride Summary
          </h2>

          <p>
            <strong>Ride ID:</strong> {ride.id}
          </p>

          <p>
            <strong>Pickup:</strong> {ride.pickupLocation}
          </p>

          <p>
            <strong>Drop:</strong> {ride.dropLocation}
          </p>

          <p>
            <strong>Status:</strong> {ride.status}
          </p>

          <p>
            <strong>Distance:</strong> {ride.distanceKm} km
          </p>

          <p>
            <strong>Duration:</strong> {ride.durationMin} min
          </p>

          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹ {ride.fare}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Estimated Fare
          </p>

        </div>

        <div className="space-y-4">

          <label className="flex items-center gap-3 border rounded-xl p-4">
            <input
              type="radio"
              value="CASH"
              checked={paymentMethod === "CASH"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Cash
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4">
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            UPI
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4">
            <input
              type="radio"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Credit / Debit Card
          </label>

        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          Proceed to Pay
        </button>

      </div>

    </div>
  );
}

export default Payment;