import { Link } from "react-router-dom";
import { Star, CheckCircle2, Clock, ArrowRight, Car, MapPin, Flag } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Features from "../components/common/Features";
import Testimonials from "../components/common/Testimonials";
import Footer from "../components/common/Footer";


export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

     


      <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left side: text content */}
        <div>
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Now serving 40+ cities
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Your ride,
            <br />
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              reimagined.
            </span>
          </h1>

          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Book cabs in seconds, track drivers in real time, and pay the way
            you want. Modern mobility for passengers, drivers, and fleets.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/register/passenger"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
            >
              Get started free
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition"
            >
              I have an account
            </Link>
          </div>

          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              4.9 App Rating
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} className="text-green-500" />
              2M+ Rides
            </span>
          </div>
        </div>

 {/* Right side: ride preview card */}
<div className="group relative bg-gradient-to-br from-indigo-500 to-pink-400 rounded-3xl p-8 h-96 flex flex-col justify-end shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">

  {/* Dotted route line (the "road") */}
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
    <path
      d="M 60 60 Q 200 150 320 280"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="2 14"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
      className="transition-opacity duration-300 group-hover:opacity-100"
    />
  </svg>

  {/* Start pin */}
  <div className="absolute top-10 left-10 bg-white rounded-full p-2 shadow-md transition-transform duration-300 group-hover:-translate-y-1">
    <MapPin size={18} className="text-indigo-600" />
  </div>

  {/* Car icon travelling along the route */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-8">
    <Car size={26} className="text-purple-600" />
  </div>

  {/* End pin (destination flag) */}
  <div className="absolute bottom-40 right-10 bg-white rounded-full p-2 shadow-md transition-transform duration-300 group-hover:-translate-y-1">
    <Flag size={18} className="text-pink-600" />
  </div>

  {/* Ride info card (compact) */}
  <div className="relative bg-white rounded-xl p-3 w-full z-10 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
    <div className="flex items-center justify-between mb-2">
      <div>
        <p className="text-[10px] text-gray-400 font-medium tracking-wide">YOUR RIDE</p>
        <p className="text-sm font-bold text-gray-900">MG Road → Airport</p>
      </div>
      <span className="text-indigo-600 font-bold text-sm">₹720</span>
    </div>

    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1 text-gray-500 text-xs">
        <Clock size={12} />
        3 min away
      </span>
    </div>

    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
      <div className="bg-gradient-to-r from-indigo-500 to-pink-400 h-1.5 rounded-full w-3/4 transition-all duration-500 group-hover:w-full"></div>
    </div>
  </div>
</div>
      </section>

         <Features />
      <Testimonials />

    


    </div>
  );
}