const TOKEN_KEY = "token";
const EMAIL_KEY = "auth_email";
const ROLE_KEY = "auth_role";
const NAME_KEY = "auth_name";
const USER_ID_KEY = "auth_user_id";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const setEmail = (email) => localStorage.setItem(EMAIL_KEY, email);
export const getEmail = () => localStorage.getItem(EMAIL_KEY);
export const removeEmail = () => localStorage.removeItem(EMAIL_KEY);

export const setRole = (role) => localStorage.setItem(ROLE_KEY, role);
export const getRole = () => localStorage.getItem(ROLE_KEY);
export const removeRole = () => localStorage.removeItem(ROLE_KEY);

export const setName = (name) => localStorage.setItem(NAME_KEY, name);
export const getName = () => localStorage.getItem(NAME_KEY);
export const removeName = () => localStorage.removeItem(NAME_KEY);


export const setUserId = (id) => localStorage.setItem(USER_ID_KEY, id);
export const getUserId = () => {
  const id = localStorage.getItem(USER_ID_KEY);
  return id ? Number(id) : null;
};

export const removeUserId = () => localStorage.removeItem(USER_ID_KEY);

export const clearAuth = () => {
  removeToken();
  removeEmail();
  removeRole();
  removeName();
  removeUserId();
}
