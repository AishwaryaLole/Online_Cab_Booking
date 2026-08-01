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


// NOTE: the backend has server.servlet.context-path=/api AND
// RideController is mapped at "/api/rides", so the real path is
// /api/api/rides/... . api.js's baseURL is already "http://localhost:8080/api",
// so we only add "/api/rides/..." here.

// Book a new ride
export const bookRide = async (payload) => {
  const res = await api.post("/api/rides/book", payload);
  return res.data; // ApiResponse<RideResponseDTO>
};

// Get a single ride by id
export const getRideById = async (rideId) => {
  const res = await api.get(`/api/rides/${rideId}`);
  return res.data;
};

// Get ride history for a passenger
export const getRideHistory = async (passengerId) => {
  const res = await api.get(`/api/rides/history/${passengerId}`);
  return res.data;
};

// Cancel a ride
export const cancelRide = async (rideId) => {
  const res = await api.put(`/api/rides/cancel/${rideId}`);
  return res.data;
};

// Start a ride
export const startRide = async (rideId) => {
  const res = await api.put(`/api/rides/start/${rideId}`);
  return res.data;
};

// Complete a ride
export const completeRide = async (rideId) => {
  const res = await api.put(`/api/rides/complete/${rideId}`);
  return res.data;
};

export default {
  bookRide,
  getRideById,
  getRideHistory,
  cancelRide,
  startRide,
  completeRide,
};

