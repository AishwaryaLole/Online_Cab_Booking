import api from "./api";

export const authService = {
  register: (data) => api.post("/user/auth/register", data).then((r) => r.data),
  verifyOtp: (data) => api.post("/user/auth/verify-otp", data).then((r) => r.data),
  login: (data) => api.post("/user/auth/login", data).then((r) => r.data),
  forgotPassword: (data) => api.post("/user/auth/forgot-password", data).then((r) => r.data),
  resetPassword: (data) => api.post("/user/auth/reset-password", data).then((r) => r.data),
  resendOtp: (data) => api.post("/user/auth/resend-otp", data).then((r) => r.data),
};