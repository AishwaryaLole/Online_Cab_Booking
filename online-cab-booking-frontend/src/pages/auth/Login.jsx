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

export default Login;