import axios from "axios";

<<<<<<< HEAD
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

// Submit Rating
export const submitRating = async (ratingData) => {
  const response = await axios.post(
    "http://localhost:8080/ratings",
    ratingData
  );

  return response.data;
};
=======
const API_URL = "http://localhost:8080/api/passenger";


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



const getRideHistory = async()=>{

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/rides`,
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
>>>>>>> main
