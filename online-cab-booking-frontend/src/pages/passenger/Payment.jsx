import { useState } from "react";

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState("Cash");

  const ride = {
    pickup: "Pune Railway Station",
    drop: "CDAC ACTS Pune",
    fare: 250,
  };

  const handlePayment = () => {
    alert(`${paymentMethod} payment will be integrated with backend later.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment
        </h1>

        <p className="text-gray-500 mb-8">
          Select your payment method.
        </p>

        {/* Ride Summary */}
        <div className="bg-blue-50 rounded-xl p-5 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Ride Summary
          </h2>

          <p>
            <strong>Pickup:</strong> {ride.pickup}
          </p>

          <p>
            <strong>Drop:</strong> {ride.drop}
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-4">
            ₹ {ride.fare}
          </p>

        </div>

        {/* Payment Options */}
        <div className="space-y-4">

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="Cash"
              checked={paymentMethod === "Cash"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Cash
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
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

          <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            Credit / Debit Card
          </label>

        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Proceed to Pay
        </button>

      </div>

    </div>
  );
}

export default Payment;