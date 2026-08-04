import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
          Car
        </div>
        <span className="text-xl font-bold text-gray-900">CarGo..</span>
      </Link>

      {/* Nav Links (hidden on mobile, shown on md+) */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <Link to="/" className="text-indigo-600">Home</Link>
        <a href="#features" className="hover:text-indigo-600">Features</a>
        <a href="#testimonials" className="hover:text-indigo-600">Review</a>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Link to="/login" className="text-gray-700 font-medium hover:text-indigo-600">
          Login
        </Link>

        <Link
          to="/register/passenger"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}