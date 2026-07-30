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
    API.get("/admins/dashboard"),

  // =====================================
  // Users
  // =====================================

  getUsers: () =>
    API.get("/admins/users"),

  getUserById: (id) =>
    API.get(`/admins/users/${id}`),

  deleteUser: (id) =>
    API.delete(`/admins/users/${id}`),

  // =====================================
  // Drivers
  // =====================================

  getDrivers: () =>
    API.get("/admins/drivers"),

  getDriverById: (id) =>
    API.get(`/admins/drivers/${id}`),

  approveDriver: (id) =>
    API.put(`/admins/drivers/${id}/approve`),

  rejectDriver: (id) =>
    API.put(`/admins/drivers/${id}/reject`),

  suspendDriver: (id) =>
    API.put(`/admins/drivers/${id}/suspend`),

  // =====================================
  // Bookings
  // =====================================

  getBookings: () =>
    API.get("/admins/bookings"),

  getBookingById: (id) =>
    API.get(`/admins/bookings/${id}`),

  // =====================================
  // Reports
  // =====================================

  getBookingReport: () =>
    API.get("/admins/reports/bookings"),

  getRevenueReport: () =>
    API.get("/admins/reports/revenue"),

  getDriverReport: () =>
    API.get("/admins/reports/drivers"),

  getPassengerReport: () =>
    API.get("/admins/reports/passengers"),

    updateUser: (id, userData) =>
    API.put(`/admins/users/${id}`, userData),
};

export default adminService;