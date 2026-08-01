import api from "../api/api";

// Make a payment for a ride
export const makePayment = async (payload) => {
  const res = await api.post("/payments/make", payload);
  return res.data; // ApiResponse<PaymentResponseDto>
};

// Get status of a single payment
export const getPaymentStatus = async (paymentId) => {
  const res = await api.get(`/payments/${paymentId}/status`);
  return res.data;
};

// Get all payments made by a user (passenger)
export const getPaymentHistory = async (userId) => {
  const res = await api.get(`/payments/users/${userId}`);
  return res.data;
};

// Get all payments for a specific ride
export const getPaymentHistoryByRide = async (rideId) => {
  const res = await api.get(`/payments/rides/${rideId}`);
  return res.data;
};

export default {
  makePayment,
  getPaymentStatus,
  getPaymentHistory,
  getPaymentHistoryByRide,
};
