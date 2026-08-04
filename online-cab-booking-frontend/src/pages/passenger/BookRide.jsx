import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation2, Clock, IndianRupee, Loader2, Smartphone, CreditCard, Banknote } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import LocationInput from "../../components/passenger/LocationInput";
import RideMap from "../../components/passenger/RideMap";
import { getRoute } from "../../services/mapService";
import { bookRide } from "../../services/rideService";

const BASE_FARE = 12; // flat starting fare in rupees
const RATE_PER_KM = 14; // rupees per km

const PAYMENT_METHODS = [
  { value: "CASH", label: "Cash", icon: Banknote },
  { value: "UPI", label: "UPI", icon: Smartphone },
  { value: "CARD", label: "Card", icon: CreditCard },
];

export default function BookRide() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [pickupText, setPickupText] = useState("");
  const [dropText, setDropText] = useState("");
  const [pickup, setPickup] = useState(null); // { label, lat, lng }
  const [drop, setDrop] = useState(null);

  const [routeCoords, setRouteCoords] = useState([]);
  const [distanceKm, setDistanceKm] = useState(null);
  const [durationMin, setDurationMin] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);

  const [booking, setBooking] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const fare =
    distanceKm != null
      ? Math.round(BASE_FARE + distanceKm * RATE_PER_KM)
      : BASE_FARE;

  // Whenever both pickup and drop are chosen, fetch the driving route from OSRM
  useEffect(() => {
    if (!pickup || !drop) {
      setRouteCoords([]);
      setDistanceKm(null);
      setDurationMin(null);
      return;
    }

    setRouteLoading(true);
    getRoute(pickup.lat, pickup.lng, drop.lat, drop.lng)
      .then((data) => {
        const route = data?.routes?.[0];
        if (!route) {
          toast.error("Could not find a driving route between these points.");
          return;
        }
        const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteCoords(coords);
        setDistanceKm(+(route.distance / 1000).toFixed(1));
        setDurationMin(Math.round(route.duration / 60));
      })
      .catch(() => toast.error("Failed to calculate route."))
      .finally(() => setRouteLoading(false));
  }, [pickup, drop]);

  const handleBookRide = async () => {
    if (!userId) {
      toast.error("Could not identify your account. Please log in again.");
      return;
    }
    if (!pickup || !drop) {
      toast.error("Please select both pickup and drop locations.");
      return;
    }

    setBooking(true);
    try {
      const res = await bookRide({
        passengerId: userId,
        pickupLocation: pickup.label,
        pickupLatitude: pickup.lat,
        pickupLongitude: pickup.lng,
        dropLocation: drop.label,
        dropLatitude: drop.lat,
        dropLongitude: drop.lng,
        // The backend recalculates the authoritative fare from these, but it
        // needs them - without this the ride was saved with a null fare,
        // which made payment impossible later.
        distanceKm,
        durationMin,
        paymentMethod,
      });

      if (res.success) {
        if (paymentMethod === "CASH") {
          // Cash is paid to the driver at drop-off - the ride is already
          // matched to a nearby driver, nothing more to do here.
          toast.success("Ride booked! Looking for a nearby driver...");
          navigate("/passenger/ride-history");
        } else {
          // UPI / Card must be paid up front before a driver is matched.
          toast.success("Ride created! Please complete the payment to confirm your ride.");
          navigate("/passenger/payment", { state: { rideId: res.data.id } });
        }
      } else {
        toast.error(res.message || "Could not book ride.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not book ride.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Book a ride</h1>
        <p className="text-gray-500 text-sm mt-1">
          Enter pickup and drop — we'll do the rest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: square live map */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 order-1">
          <h3 className="font-bold text-gray-900 mb-3 px-1">Live map</h3>
          <div className="w-full aspect-square rounded-xl border border-gray-200 overflow-hidden relative">
            <RideMap pickup={pickup} drop={drop} routeCoords={routeCoords} />
            {routeLoading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <Loader2 className="animate-spin text-violet-600" size={28} />
              </div>
            )}
          </div>
        </div>

        {/* Right: booking form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 order-2">
          <LocationInput
            label="Pickup location"
            placeholder="e.g. MG Road"
            value={pickupText}
            variant="pickup"
            onChange={(val) => {
              setPickupText(val);
              if (pickup) setPickup(null);
            }}
            onSelect={(place) => {
              setPickup(place);
              setPickupText(place.label);
            }}
          />

          <LocationInput
            label="Drop location"
            placeholder="e.g. Airport"
            value={dropText}
            variant="drop"
            onChange={(val) => {
              setDropText(val);
              if (drop) setDrop(null);
            }}
            onSelect={(place) => {
              setDrop(place);
              setDropText(place.label);
            }}
          />

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Navigation2 size={13} /> Distance
              </p>
              <p className="mt-1 font-semibold text-gray-800">
                {distanceKm != null ? `${distanceKm} km` : "—"}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={13} /> ETA
              </p>
              <p className="mt-1 font-semibold text-gray-800">
                {durationMin != null ? `${durationMin} min` : "—"}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-3">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <IndianRupee size={13} /> Fare
              </p>
              <p className="mt-1 font-semibold text-gray-800">₹{fare}</p>
            </div>
          </div>

          {/* Fare summary */}
          <div className="rounded-xl bg-gray-50 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Base fare</span>
              <span className="text-gray-800">₹{BASE_FARE}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                Distance ({distanceKm ?? 0} km)
              </span>
              <span className="text-gray-800">
                ₹{distanceKm != null ? Math.round(distanceKm * RATE_PER_KM) : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Taxes</span>
              <span className="text-gray-800">Incl.</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>₹{fare}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Payment method</label>
            <div className="grid grid-cols-3 gap-3">
              {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPaymentMethod(value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-semibold transition-colors ${
                    paymentMethod === value
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              {paymentMethod === "CASH"
                ? "Pay the driver directly at drop-off."
                : "You'll pay now, before a driver is assigned."}
            </p>
          </div>

          <button
            onClick={handleBookRide}
            disabled={!pickup || !drop || booking}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-md shadow-violet-200 transition-opacity flex items-center justify-center gap-2"
          >
            {booking && <Loader2 size={18} className="animate-spin" />}
            {booking ? "Booking..." : paymentMethod === "CASH" ? "Book ride" : "Continue to payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
