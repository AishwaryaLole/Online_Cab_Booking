import api from "../api/api";

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
