import api from "./api";

// Backend context path is /api, and RideController is @RequestMapping("/api/rides")
// so full path becomes /api/api/rides/*
const BASE = "/api/rides";

export const rideService = {
  book: (payload) => api.post(`${BASE}/book`, payload).then((r) => r.data?.data),
  getById: (id) => api.get(`${BASE}/${id}`).then((r) => r.data?.data),
  history: (passengerId) =>
    api.get(`${BASE}/history/${passengerId}`).then((r) => r.data?.data ?? []),
  cancel: (id) => api.put(`${BASE}/cancel/${id}`).then((r) => r.data?.data),
  start: (id) => api.put(`${BASE}/start/${id}`).then((r) => r.data?.data),
  complete: (id) => api.put(`${BASE}/complete/${id}`).then((r) => r.data?.data),
};
