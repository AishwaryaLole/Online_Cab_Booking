export const API_BASE_URL = "http://localhost:8080/api";

export const ROLES = {
  PASSENGER: "PASSENGER",
  DRIVER: "DRIVER",
  ADMIN: "ADMIN",
};

export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER_PASSENGER: "/register/passenger",
  REGISTER_DRIVER: "/register/driver",
  REGISTER_ADMIN: "/register/admin",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

export const DASHBOARD_ROUTES = {
  PASSENGER: "/passenger/dashboard",
  DRIVER: "/driver/dashboard",
  ADMIN: "/admin/dashboard",
};

export const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
export const OSRM_URL = "https://router.project-osrm.org";
export const FARE_PER_KM = 16;   // ₹15 - ₹18 per km, 16 used as the charged rate
export const BASE_FARE = 30;     // fixed pickup charge