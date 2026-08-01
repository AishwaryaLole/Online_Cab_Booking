import { createContext, useState, useCallback } from "react";
import { loginUser } from "../services/authService";
import {
  setToken, getToken,
  setEmail, getEmail,
  setRole, getRole,
  setName, getName,
  clearAuth,
} from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const [email, setEmailState] = useState(getEmail());
  const [role, setRoleState] = useState(getRole());
  const [name, setNameState] = useState(getName());

  const login = useCallback(async (loginEmail, password) => {
    const res = await loginUser({ email: loginEmail, password });
    if (res.success) {
      setToken(res.token);
      setEmail(loginEmail);
      setRole(res.role);
      setName(res.name);
      setTokenState(res.token);
      setEmailState(loginEmail);
      setRoleState(res.role);
      setNameState(res.name);
    }
    return res;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setTokenState(null);
    setEmailState(null);
    setRoleState(null);
    setNameState(null);
  }, []);

  const value = { token, email, role, name, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}