import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRole } from "../../utils/storage";
import { isValidEmail } from "../../utils/validators";
import { DASHBOARD_ROUTES, AUTH_ROUTES } from "../../utils/constants";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setLoading(true);
    const res = await login(form.email, form.password);
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Login successful");
      const role = getRole(form.email);
      navigate(DASHBOARD_ROUTES[role] || DASHBOARD_ROUTES.PASSENGER);
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-6">
      <div className="text-center space-y-1">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
          🚕
        </div>
        <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
        <p className="text-xs text-slate-500">Login to continue booking your rides</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Email</label>
          <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
            <Mail className="w-4 h-4 text-purple-600 mr-2" />
            <input type="email" name="email" required value={form.email} onChange={handleChange}
              placeholder="you@example.com" className="w-full outline-none text-sm bg-transparent" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Password</label>
          <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
            <Lock className="w-4 h-4 text-purple-600 mr-2" />
            <input type="password" name="password" required value={form.password} onChange={handleChange}
              placeholder="••••••••" className="w-full outline-none text-sm bg-transparent" />
          </div>
        </div>

        <div className="text-right">
          <Link to={AUTH_ROUTES.FORGOT_PASSWORD} className="text-xs font-semibold text-purple-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Don't have an account?{" "}
        <Link to={AUTH_ROUTES.REGISTER_PASSENGER} className="text-purple-600 font-bold hover:underline">
          Register as Passenger
        </Link>
      </p>
    </div>
  );
}