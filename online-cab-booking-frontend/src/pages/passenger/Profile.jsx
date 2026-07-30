import { useState } from "react";

function Profile() {
 const [profile, setProfile] = useState({
    fullName: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    gender: "Male",
    address: "Pune, Maharashtra",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile update API will be connected later.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Profile
        </h1>

        <p className="text-gray-500 mb-8">
          View and update your profile information.
        </p>

        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <img
            src="https://ui-avatars.com/api/?name=Passenger&background=2563eb&color=fff&size=150"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              Address
            </label>

            <textarea
              rows="4"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;