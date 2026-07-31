import api from "../api/api";

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