import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import { forgotPassword } from "../../services/authService";
import { isValidEmail } from "../../utils/validators";
import { AUTH_ROUTES } from "../../utils/constants";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) return toast.error("Enter a valid email address");

    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "OTP sent successfully");
      navigate(AUTH_ROUTES.RESET_PASSWORD, { state: { email } });
    } else {
      toast.error(res.message || "User not found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-purple-600">
        <Mail className="w-4 h-4 text-purple-600 mr-2" />
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com" className="w-full outline-none text-sm bg-transparent" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </form>
  );
}