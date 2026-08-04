import api from "../api/api";

export const getVehicleByDriverId = async (driverId) => {
  try {
    const res = await api.get(`/vehicles/driver/${driverId}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "No vehicle found" };
  }
};

export const addVehicle = async (data) => {
  try {
    const res = await api.post(`/vehicles`, data);
    return { success: true, data: res.data.data, message: res.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to add vehicle" };
  }
};

export const updateVehicle = async (vehicleId, data) => {
  try {
    const res = await api.put(`/vehicles/${vehicleId}`, data);
    return { success: true, data: res.data.data, message: res.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to update vehicle" };
  }
};