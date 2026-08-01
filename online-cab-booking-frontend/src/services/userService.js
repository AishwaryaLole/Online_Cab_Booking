import api from "../api/api";

// All these hit the AdminController endpoints, which are the only
// endpoints the backend exposes for reading/updating a single user.
// (There is no dedicated /passenger/profile endpoint in the backend.)

// Get every user (used once at login to resolve the logged-in user's id)
export const getAllUsers = async () => {
  const res = await api.get("/admins/users");
  return res.data.data; // array of UserAdminResponseDto
};

// Get one user by id
export const getUserById = async (userId) => {
  const res = await api.get(`/admins/users/${userId}`);
  return res.data.data;
};

// Update a user's profile (name / phone / email)
export const updateUser = async (userId, payload) => {
  const res = await api.put(`/admins/users/${userId}`, payload);
  return res.data.data;
};

// Helper: find a user's id using the email they just logged in with,
// since the login response does not include the user id.
export const findUserByEmail = async (email) => {
  const users = await getAllUsers();
  return users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );
};

export default { getAllUsers, getUserById, updateUser, findUserByEmail };
