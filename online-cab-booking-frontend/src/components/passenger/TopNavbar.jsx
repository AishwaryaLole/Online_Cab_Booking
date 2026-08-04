import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function TopNavbar() {
  const { name, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-8 py-4 border-b border-gray-100">
      <div>
        <h2 className="text-xl font-extrabold text-violet-600">CabGo</h2>
        {name && (
          <p className="text-xs text-gray-400">Welcome back, {name}</p>
        )}
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold px-4 py-2 transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}
