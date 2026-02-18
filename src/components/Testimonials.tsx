import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ravi Kumar',
    role: 'Operations Head, Retail Chain',
    text: 'DSA Mart helped us standardize billing printers and label supplies across multiple outlets with dependable turnaround.',
  },
  {
    name: 'Megha N',
    role: 'Admin Lead, Education Institute',
    text: 'From printer recommendations to consumable planning, their team gave practical guidance and responsive support.',
  },
  {
    name: 'Arjun Shetty',
    role: 'Warehouse Manager, Logistics Firm',
    text: 'We reduced downtime significantly after moving to their advised setup and service support model.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-emerald-800 to-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-4">What Clients Say</h2>
          <p className="text-emerald-100 text-lg">Feedback from businesses that rely on us for print solutions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article key={item.name} className="bg-white rounded-xl p-7 shadow-xl">
              <Quote className="text-emerald-600 mb-4" size={26} />
              <p className="text-gray-700 mb-6 leading-relaxed">{item.text}</p>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
