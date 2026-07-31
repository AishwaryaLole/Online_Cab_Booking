import axios from "axios";

const BASE_URL = "http://localhost:8080/api/api";

// Submit Rating
export const giveRating = async (ratingData) => {
  const response = await axios.post(
    `${BASE_URL}/ratings`,
    ratingData
  );

  return response.data;
};

// Get Ratings by Passenger
export const getRatingsByPassenger = async (passengerId) => {
  const response = await axios.get(
    `${BASE_URL}/ratings/passengers/${passengerId}`
  );

  return response.data;
};