import { Printer } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Printer size={32} className="text-emerald-500" />
              <div>
                <h3 className="text-2xl font-bold">DSA MART</h3>
                <p className="text-sm text-gray-400">Premium Printing Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Offering nothing below perfection & nothing above supreme quality in computer peripherals and
              printing wares since 2014.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-emerald-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-400 hover:text-emerald-500 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-emerald-500 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="/#about" className="text-gray-400 hover:text-emerald-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-emerald-500 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Labels & Barcode Supplies</li>
              <li>Wide Format Media</li>
              <li>Consumables</li>
              <li>Printing Services</li>
              <li>Copy & Scan Services</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            {currentYear} DSA MART. All rights reserved. Bangalore, Karnataka, India
          </p>
        </div>
      </div>
    </footer>
  );
}
