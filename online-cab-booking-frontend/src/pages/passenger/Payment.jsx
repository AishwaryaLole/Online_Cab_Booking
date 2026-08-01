import PaymentPanel from "../../components/passenger/PaymentPanel";

export default function Payment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your payments.</p>
      </div>

      <PaymentPanel />
    </div>
  );
}
