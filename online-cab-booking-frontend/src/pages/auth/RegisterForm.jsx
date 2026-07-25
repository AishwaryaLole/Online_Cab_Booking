import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";

function RegisterForm({ role, title }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();
  const [stage, setStage] = useState("form"); // form | otp
  const [otp, setOtp] = useState("");

  const onSubmit = async (v) => {
    try {
      await doRegister({ ...v, role });
      setStage("otp");
    } catch (e) { toast.error(e?.friendlyMessage || "Registration failed"); }
  };

  const verify = async () => {
    try {
      const email = getValues("email");
      await authService.verifyOtp({ email, otp });
      toast.success("Account verified — please log in.");
      navigate("/login");
    } catch (e) { toast.error(e?.friendlyMessage || "OTP verification failed"); }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create your CabGo account.</p>

        {stage === "form" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Full name</label>
              <input {...register("name", { required: "Required" })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" {...register("email", { required: "Required" })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input {...register("phone", { required: "Required" })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input type="password" {...register("password", { required: "Required", minLength: { value: 6, message: "Min 6 chars" } })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <button disabled={isSubmitting} className="w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground disabled:opacity-50">
              {isSubmitting ? "Creating…" : "Create account"}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Already registered? <Link to="/login" className="text-primary hover:underline">Log in</Link>
            </p>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">We sent a 6-digit code to your email.</p>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-ring" />
            <button onClick={verify} className="w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground">
              Verify & continue
            </button>
            <button onClick={() => authService.resendOtp({ email: getValues("email") }).then(() => toast.success("OTP resent"))}
              className="w-full text-sm text-muted-foreground hover:text-foreground">Resend OTP</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
