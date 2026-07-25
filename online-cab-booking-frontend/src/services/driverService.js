import api from "./api";

const BASE = "/api/drivers";

export const driverService = {
  add: (driverDto) => api.post(BASE, driverDto).then((r) => r.data?.data),
  getById: (id) => api.get(`${BASE}/${id}`).then((r) => r.data?.data),
  list: () => api.get(BASE).then((r) => r.data?.data ?? []),
  update: (id, driverDto) => api.put(`${BASE}/${id}`, driverDto).then((r) => r.data?.data),
  setAvailability: (id, availabilityDto) =>
    api.put(`${BASE}/${id}/availability`, availabilityDto).then((r) => r.data?.data),
  updateLocation: (id, locationDto) =>
    api.put(`${BASE}/${id}/location`, locationDto).then((r) => r.data?.data),
  delete: (id) => api.delete(`${BASE}/${id}`).then((r) => r.data?.data),
};
