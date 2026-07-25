import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FiMoon, FiSun, FiLogOut, FiMenu } from "react-icons/fi";
import { useState } from "react";

const linksByRole = {
  PASSENGER: [
    { to: "/passenger/dashboard", label: "Dashboard" },
    { to: "/passenger/book-ride", label: "Book Ride" },
    { to: "/passenger/current-ride", label: "Current Ride" },
    { to: "/passenger/ride-history", label: "History" },
    { to: "/passenger/profile", label: "Profile" },
    { to: "/passenger/chat", label: "Chat" },
  ],
  DRIVER: [
    { to: "/driver/dashboard", label: "Dashboard" },
    { to: "/driver/ride-requests", label: "Requests" },
    { to: "/driver/current-ride", label: "Current Ride" },
    { to: "/driver/ride-history", label: "History" },
    { to: "/driver/profile", label: "Profile" },
    { to: "/driver/chat", label: "Chat" },
  ],
  ADMIN: [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/passengers", label: "Passengers" },
    { to: "/admin/drivers", label: "Drivers" },
    { to: "/admin/vehicles", label: "Vehicles" },
    { to: "/admin/rides", label: "Rides" },
    { to: "/admin/reports", label: "Reports" },
  ],
};

export default function Navbar() {
  const { isAuthenticated, role, user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = role ? linksByRole[role] || [] : [];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">C</span>
          CabGo
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="rounded-md p-2 hover:bg-accent">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-muted-foreground">{user?.email}</span>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground hover:opacity-90"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 text-sm hover:bg-accent">Login</Link>
              <Link to="/register/passenger" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                Sign up
              </Link>
            </>
          )}
          <button className="md:hidden rounded-md p-2 hover:bg-accent" onClick={() => setOpen((o) => !o)}>
            <FiMenu />
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-2">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `block rounded-md px-3 py-2 text-sm ${isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
