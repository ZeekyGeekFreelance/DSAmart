import { Building2, Clock3, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { ProductCarousel } from './ProductCarousel';

const businessStats = [
  { label: 'Years in Printing Industry', value: '10+' },
  { label: 'Business Clients Supported', value: '500+' },
  { label: 'Products & Consumables', value: '1000+' },
  { label: 'Service Response Commitment', value: '24h' },
];

const coreStrengths = [
  {
    title: 'Complete Product + Service Model',
    description: 'Buy equipment, media, and consumables while also getting implementation support in one place.',
    icon: Layers,
  },
  {
    title: 'Expert Technical Assistance',
    description: 'Installation, troubleshooting, and maintenance from experienced professionals.',
    icon: Wrench,
  },
  {
    title: 'Reliable Supply Continuity',
    description: 'Consistent availability of core items for business-critical printing workflows.',
    icon: ShieldCheck,
  },
];

const industries = ['Retail Billing & Labels', 'Warehousing & Logistics', 'Healthcare & Labs', 'Education & Offices'];

export function HomeHighlights() {
  return (
    <>
      <ProductCarousel
        id="latest-products"
        title="Latest Products"
        subtitle="New arrivals and recently added products in our catalog."
        variant="latest"
      />

      <ProductCarousel
        id="popular-products"
        title="Popular Products"
        subtitle="Most preferred products selected by our customers."
        variant="popular"
      />

      <section id="why-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {businessStats.map((stat) => (
              <div key={stat.label} className="bg-emerald-50 rounded-xl border border-emerald-100 p-6">
                <p className="text-3xl font-bold text-emerald-700">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Businesses Choose DSA Mart</h3>
              <div className="space-y-5">
                {coreStrengths.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-emerald-700 rounded-2xl p-8 text-white">
              <p className="text-emerald-100 text-sm uppercase tracking-wide font-semibold mb-2">Who We Serve</p>
              <h3 className="text-2xl font-bold mb-4">Shop + Service for Daily Business Operations</h3>
              <p className="text-emerald-50 mb-6">
                We support teams that need dependable printing infrastructure, ongoing consumables, and fast support.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {industries.map((industry) => (
                  <div key={industry} className="bg-emerald-600 rounded-lg p-3 text-sm">
                    {industry}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/shop"
                  className="bg-white text-emerald-700 px-5 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
                >
                  Explore Products
                </a>
                <a
                  href="/services"
                  className="bg-emerald-600 border border-emerald-400 text-white px-5 py-3 rounded-lg font-semibold hover:bg-emerald-500 transition"
                >
                  Get Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900">How We Work</h3>
            <p className="text-gray-600 mt-3">A simple process to help you find and maintain the right setup.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <Building2 className="text-emerald-700 mb-4" size={24} />
              <h4 className="font-bold text-gray-900 mb-2">1. Requirement Study</h4>
              <p className="text-sm text-gray-600">We understand your volume, media type, environment, and budget.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <Layers className="text-emerald-700 mb-4" size={24} />
              <h4 className="font-bold text-gray-900 mb-2">2. Product + Service Plan</h4>
              <p className="text-sm text-gray-600">We recommend machines, consumables, and support with clear options.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <Clock3 className="text-emerald-700 mb-4" size={24} />
              <h4 className="font-bold text-gray-900 mb-2">3. Delivery & Ongoing Support</h4>
              <p className="text-sm text-gray-600">Quick delivery, setup help, and reliable post-purchase assistance.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
