import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isHomePage = window.location.pathname === '/';

  return (
    <nav className="bg-slate-50 shadow-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-emerald-700">DSA MART</h1>
              <p className="text-xs text-slate-600">Premium Printing Solutions</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <a href="/" className="text-sm text-slate-700 hover:text-emerald-700 transition">Home</a>
            <a href="/shop" className="text-sm text-slate-700 hover:text-emerald-700 transition">Shop</a>
            <a href="/services" className="text-sm text-slate-700 hover:text-emerald-700 transition">Services</a>
            <a href={isHomePage ? '#about' : '/#about'} className="text-sm text-slate-700 hover:text-emerald-700 transition">About</a>
            <a href={isHomePage ? '#contact' : '/#contact'} className="text-sm text-slate-700 hover:text-emerald-700 transition">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:08045478799" className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800">
              <Phone size={18} />
              <span className="text-sm font-medium">080-4547-8799</span>
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-200">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a href="/" className="block py-2 text-slate-700 hover:text-emerald-700">Home</a>
            <a href="/shop" className="block py-2 text-slate-700 hover:text-emerald-700">Shop</a>
            <a href="/services" className="block py-2 text-slate-700 hover:text-emerald-700">Services</a>
            <a href={isHomePage ? '#about' : '/#about'} className="block py-2 text-slate-700 hover:text-emerald-700">About</a>
            <a href={isHomePage ? '#contact' : '/#contact'} className="block py-2 text-slate-700 hover:text-emerald-700">Contact</a>
            <a href="tel:08045478799" className="flex items-center space-x-2 py-2 text-emerald-700">
              <Phone size={18} />
              <span>080-4547-8799</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
