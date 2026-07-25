import api from "./api";

// AdminController is @RequestMapping("/admins"), context-path /api → /api/admins
const BASE = "/admins";

export const adminService = {
  approveDriver: (driverId) =>
    api.post(`${BASE}/drivers/${driverId}/approve`).then((r) => r.data?.data),
  blockDriver: (driverId) =>
    api.post(`${BASE}/drivers/${driverId}/block`).then((r) => r.data?.data),
  updateDriverStatus: (driverId, status) =>
    api.put(`${BASE}/drivers/${driverId}/status`, { status }).then((r) => r.data?.data),
  listUsers: () => api.get(`${BASE}/users`).then((r) => r.data?.data ?? []),
  getUser: (id) => api.get(`${BASE}/users/${id}`).then((r) => r.data?.data),
  updateUser: (id, patch) => api.put(`${BASE}/users/${id}`, patch).then((r) => r.data?.data),
  deleteUser: (id) => api.delete(`${BASE}/users/${id}`).then((r) => r.data),
  cancelRide: (rideId, reason) =>
    api.post(`${BASE}/rides/${rideId}/cancel`, { reason }).then((r) => r.data?.data),
  bookingReport: () => api.get(`${BASE}/reports/bookings`).then((r) => r.data?.data ?? {}),
  revenueReport: () => api.get(`${BASE}/reports/revenue`).then((r) => r.data?.data ?? {}),
  driverReport: () => api.get(`${BASE}/reports/drivers`).then((r) => r.data?.data ?? {}),
};
