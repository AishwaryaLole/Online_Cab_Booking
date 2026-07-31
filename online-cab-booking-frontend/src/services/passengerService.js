import axios from "axios";

const BASE_URL = "http://localhost:8080/api/api";

// Book Ride
export const bookRide = async (rideData) => {
  const response = await axios.post(
    `${BASE_URL}/rides/book`,
    rideData
  );

  return response.data;
};
// Ride History
export const getRideHistory = async (passengerId) => {
  const response = await axios.get(
    `${BASE_URL}/rides/history/${passengerId}`
  );
  return response.data;
};

// Cancel Ride
export const cancelRide = async (rideId) => {
  const response = await axios.put(
    `${BASE_URL}/rides/cancel/${rideId}`
  );

  return response.data;
};

// Get Ride By ID
export const getRideById = async (rideId) => {
  const response = await axios.get(
    `${BASE_URL}/rides/${rideId}`
  );

  return response.data;
};

// Make Payment
export const makePayment = async (paymentData) => {
  const response = await axios.post(
    `${BASE_URL}/payments/make`,
    paymentData
  );

  return response.data;
};

