import axios from "axios";

const API_URL = "http://localhost:8080/api/rides";

// Get Passenger Ride History
export const getRideHistory = async (passengerId) => {
  try {
    const response = await axios.get(
      `${API_URL}/history/${passengerId}`
    );

    return response.data;

  } catch (error) {

    console.error(error);

    return null;
  }
};