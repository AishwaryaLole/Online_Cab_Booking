import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter,} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <span className="font-bold text-gray-900">RideFlow</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Moving people and cities forward. Book rides in seconds — safe, reliable, and always on.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FaFacebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FaXTwitter size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-3">Company</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-3">Services</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/register/passenger">Book a Ride</Link></li>
            <li><Link to="/register/driver">Drive with us</Link></li>
            <li><a href="#">Fleet</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-3">Support</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        © 2026 RideFlow. All rights reserved.
      </div>
    </footer>
  );
}