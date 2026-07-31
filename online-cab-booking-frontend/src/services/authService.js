import axios from "axios";

const BASE_URL = "http://localhost:8080/api/api";

export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${BASE_URL}/user/auth/login`,
    loginData
  );

  return response.data;
};