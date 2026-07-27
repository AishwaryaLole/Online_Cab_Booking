import { X, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-bold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Avatar */}
          <div className="flex justify-center">

            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

              <User
                size={50}
                className="text-blue-600"
              />

            </div>

          </div>

          {/* Name */}
          <div className="flex items-center gap-3">

            <User className="text-blue-600" size={20} />

            <div>
              <p className="text-gray-500 text-sm">
                Full Name
              </p>

              <h3 className="font-semibold">
                {user.name}
              </h3>
            </div>

          </div>

          {/* Email */}
          <div className="flex items-center gap-3">

            <Mail className="text-green-600" size={20} />

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <h3>{user.email}</h3>
            </div>

          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">

            <Phone className="text-purple-600" size={20} />

            <div>
              <p className="text-gray-500 text-sm">
                Phone
              </p>

              <h3>{user.phone}</h3>
            </div>

          </div>

          {/* Address */}
          <div className="flex items-center gap-3">

            <MapPin className="text-red-600" size={20} />

            <div>
              <p className="text-gray-500 text-sm">
                Address
              </p>

              <h3>
                {user.address || "Not Available"}
              </h3>
            </div>

          </div>

          {/* Registration Date */}
          <div className="flex items-center gap-3">

            <Calendar
              className="text-yellow-600"
              size={20}
            />

            <div>
              <p className="text-gray-500 text-sm">
                Registered On
              </p>

              <h3>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </h3>
            </div>

          </div>

          {/* Status */}
          <div className="flex items-center justify-between border-t pt-5">

            <span className="font-semibold">
              Account Status
            </span>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  user.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {user.status || "ACTIVE"}
            </span>

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

export default UserModal;