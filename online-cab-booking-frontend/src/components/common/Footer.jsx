import { CarFront } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">

        <div>

          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <CarFront />
            RideEasy
          </div>

          <p className="text-gray-400">
            Safe, reliable and affordable rides for everyone.
          </p>

        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>

          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>

        </div>

        <div>

          <h3 className="font-semibold mb-4">Support</h3>

          <ul className="space-y-2 text-gray-400">
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>

        </div>

        <div>

          <h3 className="font-semibold mb-4">Contact</h3>

          <p className="text-gray-400">
            support@rideeasy.com
          </p>

          <p className="text-gray-400">
            +91 9876543210
          </p>

        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-4 text-gray-400">

        © {new Date().getFullYear()} RideEasy. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;