import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getDriverByUserId, updateDriver } from "../../services/driverService";

export default function DriverProfile() {
  const { name, email, userId } = useAuth();
  const [driver, setDriver] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDriver = async () => {
      const res = await getDriverByUserId(userId);
      if (res.success) {
        setDriver(res.data);
        setLicenseNumber(res.data.licenseNumber || "");
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    };
    loadDriver();
  }, [userId]);

  const handleUpdate = async () => {
    setSaving(true);
    const res = await updateDriver(driver.id, { ...driver, licenseNumber });
    setSaving(false);

    if (res.success) {
      toast.success(res.message || "Profile updated");
      setDriver(res.data);
    } else {
      toast.error(res.message);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading profile...</p>;
  if (!driver) return <p className="p-6 text-red-500">Driver profile not found.</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Driver profile</h1>
      <p className="text-gray-500 text-sm mb-6">Keep your details up to date.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500">Full name</label>
            <input readOnly value={name || ""} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500">Email</label>
            <input readOnly value={email || ""} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500">License number</label>
          <input
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500">Status</label>
          <input readOnly value={driver.status} className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" />
        </div>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Updating..." : "Update profile"}
        </button>
      </div>
    </div>
  );
}