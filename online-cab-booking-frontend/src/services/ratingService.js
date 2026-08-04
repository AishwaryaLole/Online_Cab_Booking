import api from "../api/api";

// Submit a new rating for a completed ride
export const giveRating = async (payload) => {
  const res = await api.post("/ratings", payload);
  return res.data; // ApiResponse<RatingResponseDto>
};

// Update an existing rating
export const updateRating = async (ratingId, payload) => {
  const res = await api.put(`/ratings/${ratingId}`, payload);
  return res.data;
};

// Get ratings a passenger has given
export const getRatingsByPassenger = async (passengerId) => {
  const res = await api.get(`/ratings/passengers/${passengerId}`);
  return res.data;
};

// Get ratings for a particular ride
export const getRatingsByRide = async (rideId) => {
  const res = await api.get(`/ratings/rides/${rideId}`);
  return res.data;
};

export default {
  giveRating,
  updateRating,
  getRatingsByPassenger,
  getRatingsByRide,
};
