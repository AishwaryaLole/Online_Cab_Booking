import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const roleHome = { PASSENGER: "/passenger/dashboard", DRIVER: "/driver/dashboard", ADMIN: "/admin/dashboard" };

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    try {
      const u = await login(values.email, values.password);
      const dest = location.state?.from || roleHome[u.role] || "/";
      navigate(dest, { replace: true });
    } catch (e) {
      toast.error(e?.friendlyMessage || "Login failed");
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log in to continue.</p>

        <label className="mt-6 block text-sm font-medium">Email</label>
        <input type="email" {...register("email", { required: "Email is required" })}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}

        <label className="mt-4 block text-sm font-medium">Password</label>
        <input type="password" {...register("password", { required: "Password is required" })}
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring outline-none" />
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}

        <button disabled={isSubmitting} className="mt-6 w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground disabled:opacity-50">
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register/passenger" className="text-primary hover:underline">Sign up as passenger</Link>
          {" · "}
          <Link to="/register/driver" className="text-primary hover:underline">Driver</Link>
        </p>
      </form>
    </div>
  );
}
