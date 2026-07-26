import { Link } from "react-router-dom";
import { CarFront, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const dashboardLink = () => {
    if (!user) return "/";

    switch (user.role) {
      case "ADMIN":
        return "/admin";

      case "DRIVER":
        return "/driver";

      default:
        return "/passenger";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow border-b">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 text-2xl font-bold"
        >
          <CarFront size={30} />
          RideEasy
        </Link>

        {!isAuthenticated ? (
          <>
            <nav className="hidden md:flex gap-8 font-medium text-gray-700">
              <Link to="/">Home</Link>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="flex gap-3">

              <Link
                to="/login"
                className="flex items-center gap-2 border border-blue-600 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register/passenger"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <UserPlus size={18} />
                Register
              </Link>

            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">

            <span className="font-medium">
              Welcome, {user?.name}
            </span>

            <Link
              to={dashboardLink()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;