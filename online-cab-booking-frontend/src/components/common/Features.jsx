import { Clock, ShieldCheck, CreditCard, MapPin, Smartphone, Headphones } from "lucide-react";

const features = [
  { icon: Clock, title: "Ride in 3 minutes", desc: "Average pickup time in metros. We match you with the closest driver instantly." },
  { icon: ShieldCheck, title: "Verified drivers", desc: "Background-checked, rated, and continuously monitored for safety." },
  { icon: CreditCard, title: "Cashless payments", desc: "Pay by card, UPI, wallet — or set up ride packages for your team." },
  { icon: MapPin, title: "Live tracking", desc: "Share your trip with loved ones. Real-time driver location, always." },
  { icon: Smartphone, title: "One-tap booking", desc: "Beautiful, fast apps for passengers, drivers, and dispatchers." },
  { icon: Headphones, title: "24x7 support", desc: "Human help around the clock — chat, email, or phone." },
];

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-3">
        Why choose{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          RideFlow
        </span>
      </h2>
      <p className="text-gray-500 text-center mb-12">
        Built for how cities move today — fast, safe, and delightful for everyone.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <Icon size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}