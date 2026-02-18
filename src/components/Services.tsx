import { Copy, FileText, Scan } from 'lucide-react';

export function Services() {
  const services = [
    {
      id: 1,
      name: 'Printing Services',
      icon: FileText,
      description: 'Professional high-quality printing for all your document and design needs. From business cards to large format prints.',
      features: ['Fast turnaround', 'High quality output', 'Affordable pricing'],
    },
    {
      id: 2,
      name: 'Copy Services',
      icon: Copy,
      description: 'Efficient copying services for your documents. Black & white and color copying available with quick service.',
      features: ['Bulk discounts', 'Quick service', 'Professional quality'],
    },
    {
      id: 3,
      name: 'Scanning Services',
      icon: Scan,
      description: 'Convert your physical documents to digital format. Perfect for archiving and document management.',
      features: ['High resolution', 'Fast processing', 'Digital storage'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beyond products, we offer comprehensive printing services to meet all your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200"
              >
                <div className="h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:from-emerald-600 group-hover:to-teal-600 transition-all">
                  <Icon size={48} className="text-white" />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition text-center">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Need Custom Service?</h3>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            We also provide tailored printing solutions for bulk orders and specialized requirements
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition"
          >
            Request Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
