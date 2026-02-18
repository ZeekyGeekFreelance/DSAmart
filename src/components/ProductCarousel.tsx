import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import { sanityConfigMissing, sanityQuery, SanityProduct } from '../lib/sanity';

interface ProductCarouselProps {
  id: string;
  title: string;
  subtitle: string;
  variant: 'latest' | 'popular';
}

const callNumber = '+919845248898';

export function ProductCarousel({ id, title, subtitle, variant }: ProductCarouselProps) {
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [variant]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = useMemo(() => {
    const chunked: SanityProduct[][] = [];

    for (let i = 0; i < products.length; i += cardsPerSlide) {
      chunked.push(products.slice(i, i + cardsPerSlide));
    }

    return chunked;
  }, [products, cardsPerSlide]);

  useEffect(() => {
    setSlideIndex(0);
  }, [cardsPerSlide, products.length]);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  async function fetchProducts() {
    setLoading(true);
    setErrorMessage('');

    if (sanityConfigMissing()) {
      setErrorMessage('Sanity is not configured.');
      setLoading(false);
      return;
    }

    try {
      const baseProjection = `{
        "id": _id,
        name,
        "slug": slug.current,
        description,
        "category_id": category._ref,
        "subcategory_id": subcategory._ref,
        "specifications": coalesce(specifications, []),
        "image_url": coalesce(image.asset->url, imageUrl),
        "is_featured": coalesce(isFeatured, false),
        "created_at": _createdAt
      }`;

      const data = await sanityQuery<SanityProduct[]>(
        variant === 'popular'
          ? `*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0...12] ${baseProjection}`
          : `*[_type == "product"] | order(_createdAt desc)[0...12] ${baseProjection}`
      );

      if (variant === 'popular' && data.length === 0) {
        const fallbackData = await sanityQuery<SanityProduct[]>(
          `*[_type == "product"] | order(_createdAt desc)[0...12] ${baseProjection}`
        );
        setProducts(fallbackData ?? []);
      } else {
        setProducts(data ?? []);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to load products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id={id} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/shop"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
            >
              View All
            </a>
            {slides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                  aria-label={`Previous ${title} slide`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                  aria-label={`Next ${title} slide`}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-600">
            Loading products...
          </div>
        ) : errorMessage ? (
          <div className="bg-white border border-red-200 rounded-xl p-10 text-center text-red-600">
            {errorMessage}
          </div>
        ) : slides.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-600">
            Products will appear here soon.
          </div>
        ) : (
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div key={idx} className="min-w-full">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {slide.map((product) => (
                        <article
                          key={product.id}
                          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                        >
                          <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                            <div className="grid grid-cols-3 gap-2">
                              <a
                                href="#contact"
                                className="text-center bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition text-sm"
                              >
                                Enquiry
                              </a>
                              <a
                                href={`tel:${callNumber}`}
                                className="flex items-center justify-center gap-1 bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition text-sm"
                              >
                                <Phone size={14} />
                                Call
                              </a>
                              <a
                                href={`https://wa.me/${callNumber.replace('+', '')}?text=${encodeURIComponent(`Hi, I want details for ${product.name}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-1 bg-green-100 text-green-800 py-2 rounded-lg font-semibold hover:bg-green-200 transition text-sm"
                              >
                                <MessageCircle size={14} />
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {slides.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      slideIndex === idx ? 'w-8 bg-emerald-600' : 'w-2.5 bg-emerald-200'
                    }`}
                    aria-label={`Go to ${title} slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
