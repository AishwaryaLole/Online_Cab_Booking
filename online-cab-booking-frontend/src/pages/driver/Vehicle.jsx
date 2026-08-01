import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { getDriverByUserId } from "../../services/driverService";
import { getVehicleByDriverId, addVehicle, updateVehicle } from "../../services/vehicleService";

export default function Vehicle() {
  const { userId } = useAuth();
  const [driverId, setDriverId] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [form, setForm] = useState({ vehicleNumber: "", vehicleType: "", model: "", color: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const driverRes = await getDriverByUserId(userId);
      if (!driverRes.success) {
        toast.error(driverRes.message);
        setLoading(false);
        return;
      }
      setDriverId(driverRes.data.id);

      const vehicleRes = await getVehicleByDriverId(driverRes.data.id);
      if (vehicleRes.success) {
        setVehicle(vehicleRes.data);
        setForm(vehicleRes.data);
      }
      setLoading(false);
    };
    load();
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    const res = vehicle
      ? await updateVehicle(vehicle.id, { ...form, driverId })
      : await addVehicle({ ...form, driverId });
    setSaving(false);

    if (res.success) {
      toast.success(res.message || "Vehicle saved");
      setVehicle(res.data);
    } else {
      toast.error(res.message);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading vehicle...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Vehicle</h1>
      <p className="text-gray-500 text-sm mb-6">Details of your registered vehicle.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500">Vehicle number</label>
            <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500">Type</label>
            <input name="vehicleType" value={form.vehicleType} onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500">Model</label>
            <input name="model" value={form.model} onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500">Color</label>
            <input name="color" value={form.color} onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 disabled:opacity-60">
          {saving ? "Saving..." : vehicle ? "Update" : "Add vehicle"}
        </button>
      </div>
    </div>
  );
}