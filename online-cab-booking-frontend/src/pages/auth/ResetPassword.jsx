import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";
import { resetPassword } from "../../services/authService";
import { isValidPassword, doPasswordsMatch, isValidOtp } from "../../utils/validators";
import { AUTH_ROUTES } from "../../utils/constants";
import OTPInput from "../../components/auth/OTPInput";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOtp(otp)) return toast.error("Enter the 6-digit OTP");
    if (!isValidPassword(form.newPassword)) return toast.error("Password must be at least 6 characters");
    if (!doPasswordsMatch(form.newPassword, form.confirmPassword)) return toast.error("Passwords do not match");

    setLoading(true);
    const res = await resetPassword({ email, otp, newPassword: form.newPassword });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "Password reset successfully");
      navigate(AUTH_ROUTES.LOGIN);
    } else {
      toast.error(res.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-slate-900">Reset Password</h1>
          <p className="text-xs text-slate-500">
            Resetting password for <span className="font-bold text-slate-800">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <OTPInput value={otp} onChange={setOtp} />

          <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
            <Lock className="w-4 h-4 text-purple-600 mr-2" />
            <input type="password" name="newPassword" required value={form.newPassword} onChange={handleChange}
              placeholder="New Password" className="w-full outline-none text-sm bg-transparent" />
          </div>

          <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
            <Lock className="w-4 h-4 text-purple-600 mr-2" />
            <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange}
              placeholder="Confirm New Password" className="w-full outline-none text-sm bg-transparent" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          <Link to={AUTH_ROUTES.LOGIN} className="text-purple-600 font-bold hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}