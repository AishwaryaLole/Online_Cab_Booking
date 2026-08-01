import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CarFront,
  History,
  CreditCard,
  Star,
  User,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const navItems = [
  { to: "/passenger/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/passenger/book-ride", label: "Book Ride", icon: CarFront },
  { to: "/passenger/ride-history", label: "Ride History", icon: History },
  { to: "/passenger/payment", label: "Payment", icon: CreditCard },
  { to: "/passenger/rating", label: "Rating & Review", icon: Star },
  { to: "/passenger/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-violet-600 leading-tight">
            Cab
          </h1>
          <p className="text-xs text-gray-400">Passenger Panel</p>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
