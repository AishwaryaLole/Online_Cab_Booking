<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api"; // Updated path: Go up two levels from src/pages/auth/

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("driver@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  // Real backend login flow
  const handleRealLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const data = response.data?.data || response.data;

      // Extract token & user info returned by Spring Boot
      const token = data.token || data.jwt;
      const user = data.user || data;
      const driverId = data.driverId || user.driverId || user.id || 1;

      if (!token) {
        throw new Error("No token received from backend authentication.");
      }

      // Store VALID credentials in LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("driverId", String(driverId));

      toast.success("Login Successful!");
      navigate("/driver/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Authentication failed. Please check backend logs."
      );
    } finally {
      setLoading(false);
    }
  };

  // Demo Bypass (FOR OFFLINE / BACKEND-LESS MOCKING ONLY)
  const loginMockDriver = () => {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify({ role: "DRIVER", id: 1 }));
    localStorage.setItem("driverId", "1");

    toast.info("Logging in with local mock state...");
    navigate("/driver/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Driver Login
        </h2>

        <form onSubmit={handleRealLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login as Driver"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase font-semibold">
            Or Demo Mode
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={loginMockDriver}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2.5 rounded-lg text-sm transition"
        >
          Mock Bypass (No Token)
        </button>
      </div>
    </div>
  );
};
=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, Car } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validators";
import { DASHBOARD_ROUTES } from "../../utils/constants";
>>>>>>> 0a0591cd9d2f2167ec45a18eb85026850bf6a8e9

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Login successful");
      navigate(DASHBOARD_ROUTES[res.role] || "/");
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Car size={28} className="text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Sign in to access your cab booking account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-wide">
                EMAIL ADDRESS
              </label>
              <div className="relative mt-1">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

           <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 tracking-wide">
                  PASSWORD
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In to CabGo"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <br></br>
            <Link to="/register/passenger" className="text-indigo-600 font-semibold">Register Passenger</Link>{" "}
            ·{" "}
            <Link to="/register/driver" className="text-orange-500 font-semibold">Register Driver</Link>{" "}
            ·{" "}
            <Link to="/register/admin" className="text-purple-600 font-semibold">Register Admin</Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}