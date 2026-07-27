import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  CalendarCheck,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <Users size={20} />,
  },
  {
    title: "Drivers",
    path: "/admin/drivers",
    icon: <Car size={20} />,
  },
  {
    title: "Bookings",
    path: "/admin/bookings",
    icon: <CalendarCheck size={20} />,
  },
  {
    title: "Reports",
    path: "/admin/reports/bookings",
    icon: <BarChart3 size={20} />,
  },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400">
            Admin Panel
          </h2>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Logout */}
        <div className="absolute bottom-0 left-0 w-full border-t border-gray-700 p-4">
          <button
            className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;