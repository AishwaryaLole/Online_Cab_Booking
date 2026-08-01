import { Link } from "react-router-dom";
import ForgotPasswordForm from "../../components/auth/ForgotPassword";
import { AUTH_ROUTES } from "../../utils/constants";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-slate-900">Forgot Password</h1>
          <p className="text-xs text-slate-500">Enter your email to receive an OTP</p>
        </div>

        <ForgotPasswordForm />

        <p className="text-center text-xs text-slate-500">
          <Link to={AUTH_ROUTES.LOGIN} className="text-purple-600 font-bold hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}