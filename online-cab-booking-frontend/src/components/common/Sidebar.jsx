import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CarTaxiFront,
  History,
  Wallet,
  User,
  Car,
  Users,
  ClipboardList,
  FileBarChart2,
  IndianRupee,
  MapPin,
  LogOut
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

function Sidebar() {

  const { role, logout } = useAuth();

  const location = useLocation();

  const menus = {

    PASSENGER: [
      { title: "Dashboard", path: "/passenger", icon: LayoutDashboard },
      { title: "Book Ride", path: "/passenger/book-ride", icon: CarTaxiFront },
      { title: "Ride History", path: "/passenger/ride-history", icon: History },
      { title: "Payment", path: "/passenger/payment", icon: Wallet },
      { title: "Profile", path: "/passenger/profile", icon: User },
    ],

    DRIVER: [
      { title: "Dashboard", path: "/driver/dashboard", icon: LayoutDashboard },
      { title: "Assigned Ride", path: "/driver/assigned-ride", icon: CarTaxiFront },
      { title: "Vehicle", path: "/driver/vehicle", icon: Car },
      { title: "Location", path: "/driver/location", icon: MapPin },
      { title: "Profile", path: "/driver/profile", icon: User },
    ],

    ADMIN: [
      { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Users", path: "/admin/users", icon: Users },
      { title: "Drivers", path: "/admin/drivers", icon: Car },
      { title: "Bookings", path: "/admin/bookings", icon: ClipboardList },
      { title: "Reports", path: "/admin/reports/bookings", icon: FileBarChart2 },
    ]

  };

  const menu = menus[role] || [];

  return (

    <aside className="w-72 bg-white border-r shadow-lg min-h-screen flex flex-col">

      <div className="text-2xl font-bold text-blue-600 p-6 border-b">
        RideEasy
      </div>

      <nav className="flex-1 mt-5">

        {menu.map((item) => {

          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (

            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-3 mx-4 mb-2 px-4 py-3 rounded-xl transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50 text-gray-700"
                }`}
            >

              <Icon size={20} />

              {item.title}

            </Link>

          );

        })}

      </nav>

      <div className="p-4 border-t">

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex justify-center items-center gap-2"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );
}

export default Sidebar;