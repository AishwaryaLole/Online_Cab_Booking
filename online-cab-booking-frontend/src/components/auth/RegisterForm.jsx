import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Phone, Lock } from "lucide-react";
import { registerUser, verifyOtp, resendOtp } from "../../services/authService";
import { isValidEmail, isValidPhone, isValidPassword, doPasswordsMatch, isValidOtp } from "../../utils/validators";
import { AUTH_ROUTES } from "../../utils/constants";
import OTPInput from "./OTPInput";

export default function RegisterForm({ role, title }) {
  
  const navigate = useNavigate();
  const [stage, setStage] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
 console.log("CURRENT STAGE:", stage);

 
  useEffect(() => {
    if (stage !== "otp" || timer <= 0) return;
    const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [stage, timer]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) return toast.error("Enter a valid email address");
    if (!isValidPhone(form.phone)) return toast.error("Enter a valid 10-digit phone number");
    if (!isValidPassword(form.password)) return toast.error("Password must be at least 6 characters");
    if (!doPasswordsMatch(form.password, form.confirmPassword)) return toast.error("Passwords do not match");

    setLoading(true);
    const res = await registerUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role,
    });
    setLoading(false);

    console.log("register response:", res);

    if (res.success) {
      toast.success(res.message || "Registered successfully");
      setStage("otp");
      setTimer(60);
    } else {
      toast.error(res.message || "Registration failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!isValidOtp(otp)) return toast.error("Enter the 6-digit OTP");

    setLoading(true);
    const res = await verifyOtp({ email: form.email, otp });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "OTP verified successfully");
      navigate(AUTH_ROUTES.LOGIN);
    } else {
      toast.error(res.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    const res = await resendOtp(form.email);
    if (res.success) {
      toast.success(res.message || "OTP resent successfully");
      setTimer(60);
    } else {
      toast.error(res.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-6">
      <div className="text-center space-y-1">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
          🚕
        </div>
        <h1 className="text-2xl font-black text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500">
          {stage === "form" ? "Fill in your details to get started" : `Enter the OTP sent to ${form.email}`}
        </p>
      </div>

      {stage === "form" ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Full Name</label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
              <User className="w-4 h-4 text-purple-600 mr-2" />
              <input type="text" name="name" required value={form.name} onChange={handleChange}
                placeholder="John Doe" className="w-full outline-none text-sm bg-transparent" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Email</label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
              <Mail className="w-4 h-4 text-purple-600 mr-2" />
              <input type="email" name="email" required value={form.email} onChange={handleChange}
                placeholder="you@example.com" className="w-full outline-none text-sm bg-transparent" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Phone</label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
              <Phone className="w-4 h-4 text-purple-600 mr-2" />
              <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                placeholder="9876543210" className="w-full outline-none text-sm bg-transparent" />
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

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Confirm Password</label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
              <Lock className="w-4 h-4 text-purple-600 mr-2" />
              <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange}
                placeholder="••••••••" className="w-full outline-none text-sm bg-transparent" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <OTPInput value={otp} onChange={setOtp} />

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button type="button" onClick={handleResend} disabled={timer > 0}
            className="w-full text-xs font-bold text-purple-600 disabled:text-slate-400">
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </form>
      )}

      <p className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
        Already have an account?{" "}
        <Link to={AUTH_ROUTES.LOGIN} className="text-purple-600 font-bold hover:underline">Login Here</Link>
      </p>
    </div>
  );
}