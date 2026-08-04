import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Wallet, CreditCard, Smartphone } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRideHistory } from "../../services/rideService";
import { makePayment, getPaymentHistory } from "../../services/paymentService";
import StatusBadge from "./StatusBadge";

// Cash is intentionally not offered here - cash rides are paid to the driver
// at drop-off (see the driver's "Collect cash payment" step) and never sit
// in PAYMENT_PENDING waiting on the passenger.
const METHODS = [
  { value: "UPI", label: "UPI", icon: Smartphone },
  { value: "CARD", label: "Card", icon: CreditCard },
];

/**
 * "Pay for a ride" + "Payment history" block.
 * Only rides booked with UPI/Card show up here - they sit in PAYMENT_PENDING
 * (no driver yet) until this payment succeeds, at which point the backend
 * matches the nearest available driver.
 */
export default function PaymentPanel() {
  const { userId } = useAuth();
  const location = useLocation();
  // BookRide.jsx redirects here with { state: { rideId } } right after
  // creating a UPI/Card ride, so we can preselect it automatically.
  const preselectedRideId = location.state?.rideId;

  const [rides, setRides] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRideId, setSelectedRideId] = useState(preselectedRideId ?? "");
  const [method, setMethod] = useState("UPI");
  const [paying, setPaying] = useState(false);

  const loadData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [rideRes, paymentRes] = await Promise.all([
        getRideHistory(userId),
        getPaymentHistory(userId),
      ]);
      setRides(rideRes?.data || []);
      setPayments(paymentRes?.data || []);
    } catch {
      toast.error("Failed to load payment data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Rides waiting on an upfront (UPI/Card) payment - this is the only
  // status a passenger ever pays for directly.
  const payableRides = useMemo(
    () => rides.filter((r) => r.status === "PAYMENT_PENDING"),
    [rides]
  );

  const selectedRide = rides.find((r) => r.id === Number(selectedRideId));

  const handlePay = async () => {
    if (!selectedRideId) {
      toast.error("Please select a ride to pay for.");
      return;
    }
    setPaying(true);
    try {
      const res = await makePayment({
        rideId: Number(selectedRideId),
        paymentMethod: method,
        amount: selectedRide?.fare ?? 0,
      });
      if (res.success) {
        toast.success("Payment successful! Looking for a nearby driver...");
        setSelectedRideId("");
        loadData();
      } else {
        toast.error(res.message || "Payment failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Make a payment */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 h-fit">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Wallet size={18} className="text-violet-600" /> Pay for a ride
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Select ride</label>
          <select
            value={selectedRideId}
            onChange={(e) => setSelectedRideId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <option value="">
              {payableRides.length === 0 ? "No rides awaiting payment" : "Choose a ride"}
            </option>
            {payableRides.map((r) => (
              <option key={r.id} value={r.id}>
                RD-{r.id} · {r.pickupLocation} → {r.dropLocation}
                {r.fare != null ? ` · ₹${Number(r.fare).toFixed(1)}` : ""}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1.5">
            Cash rides don't appear here - pay your driver directly at drop-off.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Payment method</label>
          <div className="grid grid-cols-2 gap-3">
            {METHODS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setMethod(value)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-semibold transition-colors ${
                  method === value
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 text-sm">
          <span className="text-gray-500">Amount</span>
          <span className="font-bold text-gray-900">
            ₹{Number(selectedRide?.fare ?? 0).toFixed(1)}
          </span>
        </div>

        <button
          onClick={handlePay}
          disabled={paying || !selectedRideId}
          className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {paying ? "Processing..." : "Make payment"}
        </button>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Payment history</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {loading && <p className="text-sm text-gray-400">Loading...</p>}
          {!loading && payments.length === 0 && (
            <p className="text-sm text-gray-400">No payments yet.</p>
          )}
          {!loading &&
            payments
              .slice()
              .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Ride #{p.rideId} · {p.paymentMethod}
                    </p>
                    <p className="text-xs text-gray-400">
                      {p.paymentDate ? new Date(p.paymentDate).toLocaleString() : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{Number(p.amount).toFixed(1)}</p>
                    <StatusBadge status={p.paymentStatus} />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
