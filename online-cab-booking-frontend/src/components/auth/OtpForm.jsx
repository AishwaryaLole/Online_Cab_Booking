import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OTPInput from "./OTPInput";
import { verifyOtp, resendOtp } from "../../services/authService";

export default function OtpForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("No email found, please register again");
      navigate("/register/passenger");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Enter the 6 digit OTP");
      return;
    }

    setLoading(true);
    const res = await verifyOtp({ email, otp });
    setLoading(false);

    if (res.success) {
      toast.success(res.message || "OTP verified successfully");
      navigate("/login");
    } else {
      toast.error(res.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    setResending(true);
    const res = await resendOtp(email);
    setResending(false);

    if (res.success) {
      toast.success(res.message || "OTP resent successfully");
      setTimer(60);
      setOtp("");
    } else {
      toast.error(res.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
        Verify OTP
      </h1>
      <p className="text-gray-500 text-sm text-center mb-6">
        Enter the 6 digit code sent to {email}
      </p>

      <form onSubmit={handleVerify}>
        <OTPInput length={6} value={otp} onChange={setOtp} />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="text-center mt-5 text-sm text-gray-500">
        {timer > 0 ? (
          <span>Resend OTP in {timer}s</span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-indigo-600 font-semibold disabled:opacity-60"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  );
}