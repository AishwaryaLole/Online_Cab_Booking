import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, Car } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import useAuth from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validators";
import { DASHBOARD_ROUTES } from "../../utils/constants";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDemoFill = (role) => {
    if (role === "PASSENGER") setEmail("passenger@demo.com");
    if (role === "DRIVER") setEmail("driver@demo.com");
    if (role === "ADMIN") setEmail("admin@demo.com");
    setPassword("123456");
  };

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
      <Navbar />

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

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-[11px] text-gray-400 tracking-wide">
              ONE-CLICK DEMO TEST LOGINS
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            <button onClick={() => handleDemoFill("PASSENGER")} className="bg-indigo-50 text-indigo-600 text-sm font-medium py-2 rounded-lg hover:bg-indigo-100">
              Passenger
            </button>
            <button onClick={() => handleDemoFill("DRIVER")} className="bg-yellow-50 text-yellow-600 text-sm font-medium py-2 rounded-lg hover:bg-yellow-100">
              Driver
            </button>
            <button onClick={() => handleDemoFill("ADMIN")} className="bg-blue-50 text-blue-600 text-sm font-medium py-2 rounded-lg hover:bg-blue-100">
              Admin
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register/passenger" className="text-indigo-600 font-semibold">Register Passenger</Link>{" "}
            ·{" "}
            <Link to="/register/driver" className="text-orange-500 font-semibold">Register Driver</Link>
          </p>
        </div>
      </div>
    </div>
  );
}