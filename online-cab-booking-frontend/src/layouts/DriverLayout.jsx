import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Car,
  History,
  Wallet,
  User,
  Truck,
  Power,
  LogOut,
  Map,
} from "lucide-react";

const DriverLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/driver/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Ride Requests",
      path: "/driver/ride-requests",
      icon: <Car size={20} />,
    },
    {
      name: "Ride History",
      path: "/driver/ride-history",
      icon: <History size={20} />,
    },
    {
      name: "Earnings",
      path: "/driver/earnings",
      icon: <Wallet size={20} />,
    },
    {
      name: "Vehicle",
      path: "/driver/vehicle",
      icon: <Truck size={20} />,
    },
    {
      name: "Availability",
      path: "/driver/availability",
      icon: <Power size={20} />,
    },
    {
      name: "Profile",
      path: "/driver/profile",
      icon: <User size={20} />,
    },
    {
      name: "Map",
      path: "/driver/map",
      icon: <Map size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 min-h-screen w-72 shrink-0 bg-slate-900 text-white transform transition-transform duration-300 flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h1 className="text-2xl font-bold">
              Driver Panel
            </h1>

            <button
              className="lg:hidden text-slate-300 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mt-6 space-y-1">
            {menus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3.5 transition font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {menu.icon}
                <span>{menu.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button Pin To Bottom */}
        <div className="p-5 border-t border-slate-800">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 w-full py-3 rounded-lg font-semibold transition text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Navbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-700 hover:text-gray-900"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Driver Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Driver&background=0D8ABC&color=fff"
              alt="Driver"
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <span className="hidden md:block font-medium text-gray-700">
              Driver
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DriverLayout;