import RegisterForm from "../../components/auth/RegisterForm";
import { ROLES } from "../../utils/constants";

export default function DriverRegister() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-4">
      <RegisterForm role={ROLES.DRIVER} title="Driver Registration" />
    </div>
  );
}