import { Award, Target, Users } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About DSA Mart</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                DSA Mart was established in 2014 in Karnataka, India. We export and supply branded printers,
                printing paper, printing consumables and much more to businesses and individuals across the region.
              </p>
              <p>
                With over a decade of experience, we have built a reputation for delivering nothing below perfection
                and nothing above supreme quality in computer peripherals and printing wares.
              </p>
              <p>
                Our commitment to excellence and customer satisfaction has made us a trusted name in the printing
                solutions industry.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Office Environment"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
            <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Products</h3>
            <p className="text-gray-600 leading-relaxed">
              A series of product designs and implementation research outcomes in flawless and perfect range of
              products developed with modern technology.
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
            <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Infrastructure</h3>
            <p className="text-gray-600 leading-relaxed">
              We have amazing technology and machines which help us ensure that we can provide our customers with
              the best products at an affordable price.
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
            <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why Choose Us</h3>
            <p className="text-gray-600 leading-relaxed">
              Premium quality products, competitive pricing, reliable service, and a commitment to customer
              satisfaction that sets us apart.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
