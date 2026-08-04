import { createContext, useContext, useState, useCallback } from "react";
import { loginUser } from "../services/authService";
import { findUserByEmail } from "../services/userService";
import {
  setToken, getToken,
  setEmail, getEmail,
  setRole, getRole,
  setName, getName,
  setUserId, getUserId,
  clearAuth,
} from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const [email, setEmailState] = useState(getEmail());
  const [role, setRoleState] = useState(getRole());
  const [name, setNameState] = useState(getName());
  const [userId, setUserIdState] = useState(getUserId());

  const login = useCallback(async (loginEmail, password) => {
    const res = await loginUser({ email: loginEmail, password });

    if (res.success) {
      setToken(res.token);
      setEmail(loginEmail);
      setRole(res.role);
      setName(res.name);
      setUserId(res.userId);
      setTokenState(res.token);
      setEmailState(loginEmail);
      setRoleState(res.role);
      setNameState(res.name);

      setUserIdState(res.userId);


      // The login response doesn't include the user id, so resolve it
      // separately using the email the user just logged in with.
      try {
        const matchedUser = await findUserByEmail(loginEmail);
        if (matchedUser) {
          setUserId(matchedUser.id);
          setUserIdState(matchedUser.id);
        }
      } catch (err) {
        console.error("Could not resolve user id after login:", err);
      }

    }

    return res;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setTokenState(null);
    setEmailState(null);
    setRoleState(null);
    setNameState(null);
    setUserIdState(null);
  }, []);



  const value = {
    token,
    email,
    role,
    name,
    userId,
    isAuthenticated: !!token,
    login,
    logout,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
