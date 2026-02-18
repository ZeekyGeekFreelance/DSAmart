import { Printer, Phone, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                Established 2014
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Premium Printing Solutions
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Offering nothing below perfection & nothing above supreme quality in the form of computer peripherals and printing wares
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <Printer size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Branded Printers</h3>
                  <p className="text-gray-600 text-sm">HP, Canon, Epson, Konica Minolta</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition text-center"
              >
                Get Quote
              </a>
              <a
                href="#latest-products"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold border-2 border-emerald-600 hover:bg-emerald-50 transition text-center"
              >
                View Products
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-gray-200">
              <a href="tel:08045478799" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600">
                <Phone size={18} />
                <span className="font-medium">080-4547-8799</span>
              </a>
              <a href="tel:9845248898" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600">
                <Phone size={18} />
                <span className="font-medium">+91 9845248898</span>
              </a>
              <a href="mailto:grlokeshyadav@hotmail.com" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600">
                <Mail size={18} />
                <span className="font-medium">Email Us</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Professional Printer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <p className="text-4xl font-bold text-emerald-600">10+</p>
                <p className="text-gray-600 font-medium">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
