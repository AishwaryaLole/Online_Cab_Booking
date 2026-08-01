import api from "../api/api";

const isSuccess = (message = "") => message.toLowerCase().includes("success");

export const registerUser = async (data) => {
  try {
    const res = await api.post("/user/auth/register", data);
    return { success: isSuccess(res.data), message: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data || "Registration failed" };
  }
};

export const verifyOtp = async (data) => {
  try {
    const res = await api.post("/user/auth/verify-otp", data);
    return { success: isSuccess(res.data), message: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data || "OTP verification failed" };
  }
};

export const resendOtp = async (email) => {
  try {
    const res = await api.post("/user/auth/resend-otp", { email });
    return { success: isSuccess(res.data), message: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data || "Failed to resend OTP" };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post("/user/auth/login", data);
    const { message, token, role, name, userId } = res.data;
    return { success: !!token, message, token, role, name, userId };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await api.post("/user/auth/forgot-password", { email });
    return { success: isSuccess(res.data), message: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data || "Request failed" };
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await api.post("/user/auth/reset-password", data);
    return { success: isSuccess(res.data), message: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data || "Password reset failed" };
  }
};