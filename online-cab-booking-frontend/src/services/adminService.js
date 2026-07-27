import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Request Interceptor (JWT Token)
// ===============================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Response Interceptor
// ===============================

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const adminService = {
  // =====================================
  // Dashboard
  // =====================================

  getDashboardStats: () =>
    API.get("/admin/dashboard"),

  // =====================================
  // Users
  // =====================================

  getUsers: () =>
    API.get("/admin/users"),

  getUserById: (id) =>
    API.get(`/admin/users/${id}`),

  deleteUser: (id) =>
    API.delete(`/admin/users/${id}`),

  // =====================================
  // Drivers
  // =====================================

  getDrivers: () =>
    API.get("/admin/drivers"),

  getDriverById: (id) =>
    API.get(`/admin/drivers/${id}`),

  approveDriver: (id) =>
    API.put(`/admin/drivers/${id}/approve`),

  rejectDriver: (id) =>
    API.put(`/admin/drivers/${id}/reject`),

  suspendDriver: (id) =>
    API.put(`/admin/drivers/${id}/suspend`),

  // =====================================
  // Bookings
  // =====================================

  getBookings: () =>
    API.get("/admin/bookings"),

  getBookingById: (id) =>
    API.get(`/admin/bookings/${id}`),

  // =====================================
  // Reports
  // =====================================

  getBookingReport: () =>
    API.get("/admin/reports/bookings"),

  getRevenueReport: () =>
    API.get("/admin/reports/revenue"),

  getDriverReport: () =>
    API.get("/admin/reports/drivers"),

  getPassengerReport: () =>
    API.get("/admin/reports/passengers"),
};

export default adminService;