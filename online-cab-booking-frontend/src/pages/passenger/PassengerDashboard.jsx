import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarFront, User, History, Wallet, MapPin } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRideHistory } from "../../services/rideService";

export default function PassengerDashboard() {
  const { name, userId } = useAuth();
  const navigate = useNavigate();
  const [rideCount, setRideCount] = useState(null);

  useEffect(() => {
    if (!userId) return;
    getRideHistory(userId)
      .then((res) => setRideCount(res?.data?.length ?? 0))
      .catch(() => setRideCount(null));
  }, [userId]);

  const cards = [
    {
      title: "My Profile",
      description: "View and update your details",
      icon: User,
      iconBg: "bg-violet-100 text-violet-600",
      buttonLabel: "View Profile",
      buttonClass: "bg-violet-600 hover:bg-violet-700",
      to: "/passenger/profile",
    },
    {
      title: "Ride History",
      description: "Check your previous rides",
      icon: CarFront,
      iconBg: "bg-emerald-100 text-emerald-600",
      buttonLabel: "View Rides",
      buttonClass: "bg-emerald-600 hover:bg-emerald-700",
      to: "/passenger/ride-history",
    },
    {
      title: "Payments",
      description: "Manage your payments",
      icon: Wallet,
      iconBg: "bg-fuchsia-100 text-fuchsia-600",
      buttonLabel: "Open",
      buttonClass: "bg-violet-600 hover:bg-violet-700",
      to: "/passenger/payment",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-200 via-violet-100 to-purple-100 px-8 py-10">
        <div className="relative z-10 max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            Welcome, {name || "Passenger"} <span>👋</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Book your ride quickly and safely.
          </p>
          {rideCount !== null && (
            <p className="text-sm text-violet-700 mt-1 font-medium">
              You've taken {rideCount} ride{rideCount === 1 ? "" : "s"} with us so far.
            </p>
          )}
          <button
            onClick={() => navigate("/passenger/book-ride")}
            className="mt-6 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-violet-300/50 transition-colors"
          >
            <CarFront size={18} />
            Book Ride
          </button>
        </div>

        {/* Decorative illustration */}
        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white/40 flex items-center justify-center">
            <CarFront size={76} className="text-violet-500" />
          </div>
          <MapPin
            size={40}
            className="absolute -top-6 -right-2 text-violet-600 fill-violet-200"
          />
        </div>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ title, description, icon: Icon, iconBg, buttonLabel, buttonClass, to }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
              <Icon size={22} />
            </div>
            <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1 flex-1">{description}</p>
            <button
              onClick={() => navigate(to)}
              className={`mt-5 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${buttonClass}`}
            >
              {buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
