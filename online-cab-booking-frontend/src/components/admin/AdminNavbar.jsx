import { useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  UserCircle,
  ChevronRight,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { name } = useContext(AuthContext);

  // Create Breadcrumbs
  const pathnames = location.pathname
    .split("/")
    .filter((item) => item);

  const pageTitle = pathnames.length
  ? pathnames[pathnames.length - 1]
      .replace("-", " ")
      .replace(/\b\w/g, c => c.toUpperCase())
  : "Dashboard";

  return (
    <>
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Search */}
          <div>
            <h1 className="font-bold text-lg">
              {pageTitle}
            </h1>
            <p className="text-xs text-gray-500">
              Admin Control Panel
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button className="relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <UserCircle size={35} className="text-blue-600" />

            <div className="hidden sm:block">
              <h3 className="font-semibold">Welcome, {name}</h3>
            </div>
          </div>

        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b px-6 py-3 text-sm text-gray-600">

        <div className="flex items-center flex-wrap gap-2">

          <span className="font-semibold text-blue-600">
            Home
          </span>

          {pathnames.map((name, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <ChevronRight size={16} />

              <span className="capitalize">
                {name.replace("-", " ")}
              </span>
            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default AdminNavbar;