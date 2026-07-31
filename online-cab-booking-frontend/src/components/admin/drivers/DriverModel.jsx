import {
  X,
  User,
  Mail,
  Phone,
  Car,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";

const DriverModal = ({ driver, onClose }) => {
  if (!driver) return null;

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "SUSPENDED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-2xl font-bold">
            Driver Details
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

          {/* Profile */}

          <div className="flex flex-col items-center mb-8">

            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

              <User
                size={50}
                className="text-blue-600"
              />

            </div>

            <h3 className="mt-4 text-2xl font-bold">
              {driver.name}
            </h3>

            <span
              className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold ${getStatusClass(
                driver.status
              )}`}
            >
              {driver.status}
            </span>

          </div>

          {/* Information Grid */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* Email */}

            <div className="flex gap-3">

              <Mail className="text-blue-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <h4 className="font-semibold">
                  {driver.email}
                </h4>

              </div>

            </div>

            {/* Phone */}

            <div className="flex gap-3">

              <Phone className="text-green-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Phone
                </p>

                <h4 className="font-semibold">
                  {driver.phone}
                </h4>

              </div>

            </div>

            {/* Vehicle Number */}

            <div className="flex gap-3">

              <Car className="text-purple-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Vehicle Number
                </p>

                <h4 className="font-semibold">
                  {driver.vehicleNumber}
                </h4>

              </div>

            </div>

            {/* Vehicle Type */}

            <div className="flex gap-3">

              <Car className="text-orange-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Vehicle Type
                </p>

                <h4 className="font-semibold">
                  {driver.vehicleType || "N/A"}
                </h4>

              </div>

            </div>

            {/* License */}

            <div className="flex gap-3">

              <CreditCard className="text-red-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  License Number
                </p>

                <h4 className="font-semibold">
                  {driver.licenseNumber}
                </h4>

              </div>

            </div>

            {/* Address */}

            <div className="flex gap-3">

              <MapPin className="text-pink-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Address
                </p>

                <h4 className="font-semibold">
                  {driver.address || "Not Available"}
                </h4>

              </div>

            </div>

            {/* Joining Date */}

            <div className="flex gap-3">

              <Calendar className="text-indigo-600 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Registered On
                </p>

                <h4 className="font-semibold">
                  {driver.createdAt
                    ? new Date(driver.createdAt).toLocaleDateString()
                    : "N/A"}
                </h4>

              </div>

            </div>

            {/* Driver ID */}

            <div className="flex gap-3">

              <User className="text-gray-700 mt-1" />

              <div>

                <p className="text-gray-500 text-sm">
                  Driver ID
                </p>

                <h4 className="font-semibold">
                  #{driver.id}
                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

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

export default DriverModal;