import {
  X,
  User,
  Car,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  CreditCard,
} from "lucide-react";

const BookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "ACCEPTED":
        return "bg-blue-100 text-blue-700";

      case "ONGOING":
        return "bg-purple-100 text-purple-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Booking Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <div className="grid md:grid-cols-2 gap-6">

            {/* Booking ID */}

            <div>

              <label className="text-gray-500 text-sm">
                Booking ID
              </label>

              <h3 className="font-semibold text-lg">
                #{booking.bookingId || booking.id}
              </h3>

            </div>

            {/* Status */}

            <div>

              <label className="text-gray-500 text-sm">
                Booking Status
              </label>

              <div className="mt-2">

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

              </div>

            </div>

            {/* Passenger */}

            <div className="flex gap-3">

              <User className="text-blue-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Passenger
                </p>

                <h4 className="font-semibold">
                  {booking.passengerName}
                </h4>

              </div>

            </div>

            {/* Driver */}

            <div className="flex gap-3">

              <Car className="text-green-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Driver
                </p>

                <h4 className="font-semibold">
                  {booking.driverName || "Not Assigned"}
                </h4>

              </div>

            </div>

            {/* Pickup */}

            <div className="flex gap-3">

              <MapPin className="text-blue-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Pickup Location
                </p>

                <h4 className="font-semibold">
                  {booking.pickupLocation}
                </h4>

              </div>

            </div>

            {/* Drop */}

            <div className="flex gap-3">

              <MapPin className="text-red-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Drop Location
                </p>

                <h4 className="font-semibold">
                  {booking.dropLocation}
                </h4>

              </div>

            </div>

            {/* Date */}

            <div className="flex gap-3">

              <Calendar className="text-purple-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Booking Date
                </p>

                <h4 className="font-semibold">
                  {booking.bookingDate
                    ? new Date(
                        booking.bookingDate
                      ).toLocaleDateString()
                    : "N/A"}
                </h4>

              </div>

            </div>

            {/* Time */}

            <div className="flex gap-3">

              <Clock className="text-orange-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Booking Time
                </p>

                <h4 className="font-semibold">
                  {booking.bookingTime || "N/A"}
                </h4>

              </div>

            </div>

            {/* Fare */}

            <div className="flex gap-3">

              <IndianRupee className="text-green-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Fare
                </p>

                <h4 className="font-semibold">
                  ₹ {booking.fare}
                </h4>

              </div>

            </div>

            {/* Payment */}

            <div className="flex gap-3">

              <CreditCard className="text-indigo-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Payment Status
                </p>

                <h4 className="font-semibold">
                  {booking.paymentStatus || "Pending"}
                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookingModal;