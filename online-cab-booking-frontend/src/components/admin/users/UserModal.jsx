import { X, User, Mail, Phone, Calendar, Save } from "lucide-react";
import { useEffect, useState } from "react";

const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "PASSENGER",
    isVerified: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        role: user.role || "PASSENGER",
        isVerified: user.isVerified ?? false,
      });

      setErrors({
        email: "",
        phone: "",
      });
    }
  }, [user]);

  if (!user) return null;

  // ==========================
  // Validation
  // ==========================

  const validate = () => {
    const newErrors = {};

    // Email Validation
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Please enter a valid email address";
    }

    // Mobile Validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone =
        "Mobile number must be exactly 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let inputValue = value;

    // Only allow digits in phone field
    if (name === "phone") {
      inputValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : inputValue,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================
  // Save User
  // ==========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (onSave) {
      onSave({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        role: formData.role,
        isVerified: formData.isVerified,
      });
    }

    setIsEditing(false);
  };
    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[calc(100vh-3rem)] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit User" : "User Details"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

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
            <User
              className="text-blue-600"
              size={20}
            />

            <div className="w-full">

              <p className="text-gray-500 text-sm">
                Full Name
              </p>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              ) : (
                <h3 className="font-semibold">
                  {user.name}
                </h3>
              )}

            </div>
          </div>

          {/* Email */}

          <div className="flex items-start gap-3">

            <Mail
              className="text-green-600 mt-2"
              size={20}
            />

            <div className="w-full">

              <p className="text-gray-500 text-sm">
                Email
              </p>

              {isEditing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 transition
                    ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </>
              ) : (
                <h3>{user.email}</h3>
              )}

            </div>
          </div>

          {/* Phone */}

          <div className="flex items-start gap-3">

            <Phone
              className="text-purple-600 mt-2"
              size={20}
            />

            <div className="w-full">

              <p className="text-gray-500 text-sm">
                Phone
              </p>

              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="Enter 10 digit mobile number"
                    className={`mt-1 w-full rounded-lg border px-3 py-2 transition
                    ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </>
              ) : (
                <h3>{user.phone}</h3>
              )}

            </div>
          </div>

          {/* Registered Date */}

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
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </h3>

            </div>

          </div>

          {/* Role */}

          <div className="rounded-lg border border-gray-200 p-4">

            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>

            {isEditing ? (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="PASSENGER">
                  Passenger
                </option>

                <option value="DRIVER">
                  Driver
                </option>

                <option value="ADMIN">
                  Admin
                </option>

              </select>
            ) : (
              <p className="mt-2 text-gray-700">
                {user.role}
              </p>
            )}

            <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">

              <input
                type="checkbox"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleChange}
                disabled={!isEditing}
              />

              Verified User

            </label>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t pt-4">

            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);

                    setErrors({
                      email: "",
                      phone: "",
                    });
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Close
                </button>
              </>
            )}

          </div>

        </form>

      </div>
    </div>
  );
};

export default UserModal;