import { Phone, Mail, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Have questions about our products? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
            <div className="space-y-2">
              <a href="tel:08045478799" className="block text-emerald-100 hover:text-white transition">
                080-4547-8799
              </a>
              <a href="tel:9845248898" className="block text-emerald-100 hover:text-white transition">
                +91 9845248898
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
            <a
              href="mailto:grlokeshyadav@hotmail.com"
              className="text-emerald-100 hover:text-white transition break-all"
            >
              grlokeshyadav@hotmail.com
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
            <p className="text-emerald-100">
              Behind Kaveri Bar Restaurant
              <br />
              Chamarajpet, Bangalore
              <br />
              Karnataka, India
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Enquiry</h3>
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your phone"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                placeholder="Tell us about your requirements"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
