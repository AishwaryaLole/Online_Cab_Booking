import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Nair", role: "Product Manager", quote: "Rides are always on time and the app is a joy to use. This is what Uber should feel like.", initial: "P" },
  { name: "Rahul K.", role: "Driver Partner", quote: "Earnings are transparent, dispatch is fair, and support actually picks up the phone.", initial: "R" },
  { name: "Divya S.", role: "HR Head", quote: "Our team's commute problems disappeared. The corporate dashboard is fantastic.", initial: "D" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
        Loved by riders and drivers
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {testimonials.map(({ name, role, quote, initial }) => (
          <div key={name} className="border border-gray-100 rounded-2xl p-6">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">"{quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                {initial}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{name}</p>
                <p className="text-gray-400 text-xs">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-pink-400 rounded-3xl p-12 text-center">
        <h3 className="text-3xl font-extrabold text-white mb-3">Ready to ride?</h3>
        <p className="text-white/90 mb-8">
          Create an account in under a minute. Your first ride is on us.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/register/passenger" className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
            Create account
          </Link>
          <Link to="/login" className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}