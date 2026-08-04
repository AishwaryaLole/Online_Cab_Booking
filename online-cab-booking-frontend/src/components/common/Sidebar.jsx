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
<<<<<<< HEAD
  const { user, logout } = useAuth();
=======

  const location = useLocation();

    PASSENGER: [
      {
        title: "Dashboard",
        path: "/passenger",
        icon: LayoutDashboard,
      },
      {
        title: "Book Ride",
        path: "/passenger/book-ride",
        icon: CarTaxiFront,
      },
      {
        title: "Ride History",
        path: "/passenger/ride-history",
        icon: History,
      },
      {
        title: "Payment",
        path: "/passenger/payment",
        icon: Wallet,
      },
      {
        title: "Profile",
        path: "/passenger/profile",
        icon: User,
      },
    ],

    DRIVER: [
<<<<<<< HEAD
  {
    title: "Dashboard",
    path: "/driver",
    icon: LayoutDashboard,
  },
  {
    title: "Ride Requests",
    path: "/driver/ride-requests",
    icon: CarTaxiFront,
  },
  {
    title: "Current Ride",
    path: "/driver/current-ride",
    icon: Car,
  },
  {
    title: "Ride History",
    path: "/driver/ride-history",
    icon: History,
  },
  {
    title: "Earnings",
    path: "/driver/earnings",
    icon: IndianRupee,
  },
  {
    title: "Vehicle Details",
    path: "/driver/vehicle-details",
    icon: Car,
  },
  {
    title: "Profile",
    path: "/driver/profile",
    icon: User,
  },
],
    ADMIN: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: Users,
      },
      {
        title: "Drivers",
        path: "/admin/drivers",
        icon: Car,
      },
      {
        title: "Bookings",
        path: "/admin/bookings",
        icon: ClipboardList,
      },
      {
        title: "Reports",
        path: "/admin/reports",
        icon: FileBarChart2,
      },
    ],
=======
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

>>>>>>> 0a0591cd9d2f2167ec45a18eb85026850bf6a8e9
  };

  const menu = menus[role] || [];

  return (
    <aside className="w-72 min-h-screen bg-white border-r shadow-lg flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          RideEasy
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-5 px-3">

        {menu.map((item) => {

          const Icon = item.icon;

          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );

        })}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;