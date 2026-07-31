import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCar,
  FaHistory,
  FaMapMarkedAlt,
  FaCreditCard,
  FaStar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function PassengerSidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/passenger",
    },
    {
      name: "Book Ride",
      icon: <FaCar />,
      path: "/passenger/book-ride",
    },
    {
      name: "Ride History",
      icon: <FaHistory />,
      path: "/passenger/ride-history",
    },
    {
      name: "Track Ride",
      icon: <FaMapMarkedAlt />,
      path: "/passenger/track-ride",
    },
    {
      name: "Payment",
      icon: <FaCreditCard />,
      path: "/passenger/payment",
    },
    {
      name: "Rating & Review",
      icon: <FaStar />,
      path: "/passenger/rating",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/passenger/profile",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          Cab
        </h1>

        <p className="text-gray-500 text-sm">
          Passenger Panel
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path === "/passenger"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default PassengerSidebar;