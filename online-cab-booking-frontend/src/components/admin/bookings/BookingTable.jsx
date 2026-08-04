import { useState } from "react";
import {
  Eye,
  MapPin,
  User,
  Car,
  IndianRupee,
} from "lucide-react";

const BookingTable = ({ bookings, onView, drivers = [], onAssignDriver }) => {
  const [pickerRideId, setPickerRideId] = useState(null);
  const [pickedDriverId, setPickedDriverId] = useState("");

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Bookings Found
        </h2>

        <p className="text-gray-500 mt-2">
          There are no booking records available.
        </p>
      </div>
    );
  }

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
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* Header */}

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                #
              </th>

              <th className="px-4 py-3 text-left">
                Booking ID
              </th>

              <th className="px-4 py-3 text-left">
                Passenger
              </th>

              <th className="px-4 py-3 text-left">
                Driver
              </th>

              <th className="px-4 py-3 text-left">
                Pickup
              </th>

              <th className="px-4 py-3 text-left">
                Drop
              </th>

              <th className="px-4 py-3 text-left">
                Fare
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          {/* Body */}

          <tbody>

            {bookings.map((booking, index) => (

              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-4">
                  {index + 1}
                </td>

                <td className="px-4 py-4 font-semibold">
                  #{booking.bookingId || booking.id}
                </td>

                {/* Passenger */}

                <td className="px-4 py-4">

                  <div className="flex items-center gap-2">

                    <User
                      size={16}
                      className="text-blue-600"
                    />

                    {booking.passengerName}

                  </div>

                </td>

                {/* Driver */}

                <td className="px-4 py-4">

                  <div className="flex items-center gap-2">

                    <Car
                      size={16}
                      className="text-green-600"
                    />

                    {booking.driverName || "-"}

                  </div>

                </td>

                {/* Pickup */}

                <td className="px-4 py-4">

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={16}
                      className="text-blue-500"
                    />

                    {booking.pickupLocation}

                  </div>

                </td>

                {/* Drop */}

                <td className="px-4 py-4">

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={16}
                      className="text-red-500"
                    />

                    {booking.dropLocation}

                  </div>

                </td>

                {/* Fare */}

                <td className="px-4 py-4">

                  <div className="flex items-center gap-1 font-semibold">

                    <IndianRupee size={15} />

                     {Number(booking.fare || 0).toFixed(1)}

                  </div>

                </td>

                {/* Status */}

                <td className="px-4 py-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-4 py-4">

                  <div className="flex flex-col items-center gap-2">

                    <button
                      onClick={() => onView(booking)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    >
                      <Eye size={18} />
                    </button>

                    {["REQUESTED", "ASSIGNED"].includes(booking.status) && (
                      pickerRideId === booking.id ? (
                        <div className="flex items-center gap-1">
                          <select
                            value={pickedDriverId}
                            onChange={(e) => setPickedDriverId(e.target.value)}
                            className="border rounded px-2 py-1 text-xs"
                          >
                            <option value="">Select driver</option>
                            {drivers.map((d) => (
                              <option key={d.driverId} value={d.driverId}>
                                {d.name || `Driver #${d.driverId}`}
                              </option>
                            ))}
                          </select>
                          <button
                            disabled={!pickedDriverId}
                            onClick={() => {
                              onAssignDriver(booking.id, pickedDriverId);
                              setPickerRideId(null);
                              setPickedDriverId("");
                            }}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-2 py-1 rounded"
                          >
                            Assign
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setPickerRideId(booking.id)}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          Assign driver
                        </button>
                      )
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BookingTable;