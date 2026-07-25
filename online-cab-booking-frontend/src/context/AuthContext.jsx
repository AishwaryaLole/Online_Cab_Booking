import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { authService } from "../services/authService";
import { decodeJwt, isExpired } from "../utils/jwt";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("cabgo_token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cabgo_user")) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && isExpired(token)) {
      logout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (t, u) => {
    if (t) localStorage.setItem("cabgo_token", t); else localStorage.removeItem("cabgo_token");
    if (u) localStorage.setItem("cabgo_user", JSON.stringify(u)); else localStorage.removeItem("cabgo_user");
    setToken(t); setUser(u);
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      // Response shape: LoginResponse { message, token }. Role/user id are inside JWT claims.
      const t = res?.token || res?.data?.token;
      if (!t) throw new Error(res?.message || "Login failed");
      const claims = decodeJwt(t) || {};
      const u = {
        email: claims.sub || email,
        role: (claims.role || claims.authorities || "").toString().replace(/^ROLE_/, "").toUpperCase() || "PASSENGER",
        id: claims.userId || claims.id || null,
        name: claims.name || null,
      };
      persist(t, u);
      toast.success("Welcome back!");
      return u;
    } finally { setLoading(false); }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const res = await authService.register(payload);
      toast.success(res?.message || "Registered — check your email for the OTP.");
      return res;
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(() => {
    persist(null, null);
  }, []);

  const value = useMemo(() => ({
    token, user, loading,
    isAuthenticated: !!token && !isExpired(token),
    role: user?.role || null,
    login, register, logout, setUser: (u) => persist(token, u),
  }), [token, user, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
