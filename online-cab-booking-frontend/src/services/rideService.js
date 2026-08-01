import api from "../api/api";

export const getAssignedRides = async (driverId) => {
  try {
    const res = await api.get(`/rides/driver/${driverId}/assigned`);
    return { success: true, data: res.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to load assigned rides" };
  }
};

export const getDriverRideHistory = async (driverId) => {
  try {
    const res = await api.get(`/rides/driver/${driverId}/history`);
    return { success: true, data: res.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to load ride history" };
  }
};

export const acceptRide = async (rideId) => {
  try {
    const res = await api.put(`/rides/${rideId}/accept`);
    return { success: true, data: res.data.data, message: res.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to accept ride" };
  }
};

export const rejectRide = async (rideId) => {
  try {
    const res = await api.put(`/rides/${rideId}/reject`);
    return { success: true, data: res.data.data, message: res.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to reject ride" };
  }
};

