import api from "../api/api";

<<<<<<< HEAD
/* ================================
   Book / Get / Cancel
================================ */

export const bookRide = async (rideData) => {
  const response = await api.post("/rides/book", rideData);
  return response.data.data;
};

export const getRideById = async (rideId) => {
  const response = await api.get(`/rides/${rideId}`);
  return response.data.data;
};

export const cancelRide = async (rideId) => {
  const response = await api.put(`/rides/cancel/${rideId}`);
  return response.data.data;
};

/* ================================
   Start / Complete
   NOTE: path order matches RideController.java
   -> PUT /rides/start/{id}, PUT /rides/complete/{id}
================================ */

export const startRide = async (rideId) => {
  const response = await api.put(`/rides/start/${rideId}`);
  return response.data.data;
};

export const completeRide = async (rideId) => {
  const response = await api.put(`/rides/complete/${rideId}`);
  return response.data.data;
};

/* ================================
   Ride History (Passenger)
   Matches backend: GET /rides/history/{passengerId}
================================ */

export const getRideHistory = async (passengerId) => {
  const response = await api.get(`/rides/history/${passengerId}`);
  return response.data.data;
};

/* ================================
   Ride History (Driver)
   ⚠️ Backend doesn't have this endpoint yet.
   Ask backend teammate to add:
   GET /api/rides/driver/{driverId}/history
================================ */

export const getDriverRideHistory = async (driverId) => {
  const response = await api.get(`/rides/driver/${driverId}/history`);
  return response.data.data;
};

/* ================================
   Pending Ride Requests / Accept / Reject
   ⚠️ Also not in backend yet (flagged back in Task 2).
   Ask backend teammate to add:
   GET /api/rides/driver/{driverId}/pending
   PUT /api/rides/{id}/accept
   PUT /api/rides/{id}/reject
================================ */

export const getPendingRides = async (driverId) => {
  const response = await api.get(`/rides/driver/${driverId}/pending`);
  return response.data.data;
};

export const acceptRide = async (rideId) => {
  const response = await api.put(`/rides/${rideId}/accept`);
  return response.data.data;
};

export const rejectRide = async (rideId) => {
  const response = await api.put(`/rides/${rideId}/reject`);
  return response.data.data;
};
=======

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


// NOTE: api.js's baseURL is already "http://localhost:8080/api" (see .env's
// VITE_API_BASE_URL), and RideController is mapped at "/rides" (see
// RideController.java: @RequestMapping("/rides")). So paths here must start
// with "/rides/...", NOT "/api/rides/..." - adding "/api" again produced
// "/api/api/rides/..." which 404'd on every call (book, history, cancel,
// start, complete). This was the main reason bookings/history looked broken.

// Book a new ride
export const bookRide = async (payload) => {
  const res = await api.post("/rides/book", payload);
  return res.data; // ApiResponse<RideResponseDTO>
};

// Get a single ride by id
export const getRideById = async (rideId) => {
  const res = await api.get(`/rides/${rideId}`);
  return res.data;
};

// Get ride history for a passenger
export const getRideHistory = async (passengerId) => {
  const res = await api.get(`/rides/history/${passengerId}`);
  return res.data;
};

// Cancel a ride
export const cancelRide = async (rideId) => {
  const res = await api.put(`/rides/cancel/${rideId}`);
  return res.data;
};

// Start a ride
export const startRide = async (rideId) => {
  const res = await api.put(`/rides/start/${rideId}`);
  return res.data;
};

// Complete a ride
export const completeRide = async (rideId) => {
  const res = await api.put(`/rides/complete/${rideId}`);
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

>>>>>>> 0a0591cd9d2f2167ec45a18eb85026850bf6a8e9
