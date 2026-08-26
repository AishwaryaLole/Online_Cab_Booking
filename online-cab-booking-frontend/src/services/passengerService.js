import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

// Submit Rating
export const submitRating = async (ratingData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}/ratings`,
    ratingData
  );

  return response.data;
};

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/passenger`;


const getPassengerProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/profile`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;
};



const updatePassengerProfile = async(data)=>{

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/update`,
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};


export default {

    getPassengerProfile,
    updatePassengerProfile,
    getRideHistory

};

