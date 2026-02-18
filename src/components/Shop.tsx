import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Phone, MessageCircle, X } from 'lucide-react';
import {
  sanityConfigMissing,
  sanityQuery,
  SanityProduct,
  SanityProductCategory,
  SanityProductSubcategory,
} from '../lib/sanity';

function normalizeImageUrl(url: string) {
  if (!url) return '';

  // Convert Pexels page URL to direct CDN image URL.
  const pexelsMatch = url.match(/^https?:\/\/(?:www\.)?pexels\.com\/photo\/[^/]+-(\d+)\/?$/i);
  if (pexelsMatch?.[1]) {
    const id = pexelsMatch[1];
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  }

  return url;
}

export function Shop() {
  const [categories, setCategories] = useState<SanityProductCategory[]>([]);
  const [subcategories, setSubcategories] = useState<SanityProductSubcategory[]>([]);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [expandedCategory, setExpandedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<SanityProduct | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const openContactForm = () => {
    setSelectedProduct(null);

    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', '#contact');
      } else {
        window.location.href = '/#contact';
      }
    }, 120);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      fetchProducts(selectedSubcategory);
    } else if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedSubcategory, selectedCategory]);

  useEffect(() => {
    if (!selectedProduct) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [selectedProduct]);

  async function fetchCategories() {
    if (sanityConfigMissing()) {
      setErrorMessage('Sanity is not configured. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET.');
      setLoading(false);
      return;
    }

    try {
      const data = await sanityQuery<SanityProductCategory[]>(
        `*[_type == "productCategory"] | order(order asc, name asc) {
          "id": _id,
          name,
          "slug": slug.current,
          description,
          order
        }`
      );

      setCategories(data);
      if (data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to load categories from Sanity.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubcategories(categoryId: string) {
    try {
      const data = await sanityQuery<SanityProductSubcategory[]>(
        `*[_type == "productSubcategory" && category._ref == $categoryId] | order(order asc, name asc) {
          "id": _id,
          "category_id": category._ref,
          name,
          "slug": slug.current,
          order
        }`,
        { categoryId }
      );
      setSubcategories(data);
    } catch (error) {
      console.error(error);
      setSubcategories([]);
    }
  }

  async function fetchProducts(subcategoryId: string) {
    try {
      const data = await sanityQuery<SanityProduct[]>(
        `*[_type == "product" && subcategory._ref == $subcategoryId] | order(_createdAt desc) {
          "id": _id,
          name,
          "slug": slug.current,
          description,
          "category_id": category._ref,
          "subcategory_id": subcategory._ref,
          "specifications": coalesce(specifications, []),
          "image_url": coalesce(image.asset->url, imageUrl),
          "image_urls": array::compact(coalesce(images[].image.asset->url, []) + coalesce(images[].imageUrl, [])),
          "is_featured": coalesce(isFeatured, false),
          "created_at": _createdAt
        }`,
        { subcategoryId }
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  }

  async function fetchProductsByCategory(categoryId: string) {
    try {
      const data = await sanityQuery<SanityProduct[]>(
        `*[_type == "product" && category._ref == $categoryId] | order(_createdAt desc) {
          "id": _id,
          name,
          "slug": slug.current,
          description,
          "category_id": category._ref,
          "subcategory_id": subcategory._ref,
          "specifications": coalesce(specifications, []),
          "image_url": coalesce(image.asset->url, imageUrl),
          "image_urls": array::compact(coalesce(images[].image.asset->url, []) + coalesce(images[].imageUrl, [])),
          "is_featured": coalesce(isFeatured, false),
          "created_at": _createdAt
        }`,
        { categoryId }
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  }

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products
      .filter(
        (product) =>
          product.id !== selectedProduct.id &&
          (product.subcategory_id === selectedProduct.subcategory_id ||
            product.category_id === selectedProduct.category_id)
      )
      .slice(0, 4);
  }, [products, selectedProduct]);

  const selectedProductImages = useMemo(() => {
    if (!selectedProduct) return [];
    const candidates = [selectedProduct.image_url, ...(selectedProduct.image_urls ?? [])]
      .filter(Boolean)
      .map((item) => normalizeImageUrl(item as string));
    return Array.from(new Set(candidates));
  }, [selectedProduct]);

  const getProductImage = (product: SanityProduct) => {
    const candidates = [product.image_url, ...(product.image_urls ?? [])]
      .filter(Boolean)
      .map((item) => normalizeImageUrl(item as string));
    return candidates[0] ?? '';
  };

  const showNextImage = () => {
    if (selectedProductImages.length < 2) return;
    setSelectedImageIndex((prev) => (prev + 1) % selectedProductImages.length);
  };

  const showPrevImage = () => {
    if (selectedProductImages.length < 2) return;
    setSelectedImageIndex((prev) => (prev === 0 ? selectedProductImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    setSelectedImageIndex(0);
    setTouchStartX(null);
    setIsGalleryPaused(false);
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct || selectedProductImages.length < 2 || isGalleryPaused) return;

    const interval = window.setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % selectedProductImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [selectedProduct, selectedProductImages, isGalleryPaused]);
  const currentCategory = categories.find(c => c.id === selectedCategory);
  const callNumber = '+919845248898';

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-center py-20 text-red-600">{errorMessage}</div>;
  }

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop</h2>
          <p className="text-xl text-gray-600">
            Browse our curated selection of printing supplies and equipment
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const isExpanded = expandedCategory === category.id;
                  const categorySubcats = subcategories.filter(s => s.category_id === category.id);

                  return (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedSubcategory('');
                          setExpandedCategory(isExpanded ? '' : category.id);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center justify-between transition ${
                          selectedCategory === category.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                        {categorySubcats.length > 0 && (
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        )}
                      </button>

                      {isExpanded && categorySubcats.length > 0 && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-emerald-200 pl-3">
                          {categorySubcats.map((subcat) => (
                            <button
                              key={subcat.id}
                              onClick={() => setSelectedSubcategory(subcat.id)}
                              className={`w-full text-left py-2 text-sm transition ${
                                selectedSubcategory === subcat.id
                                  ? 'text-emerald-600 font-semibold'
                                  : 'text-gray-600 hover:text-emerald-600'
                              }`}
                            >
                              {subcat.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - Products */}
          <div className="lg:col-span-3">
            {currentCategory && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory.name}</h3>
                <p className="text-gray-600">{currentCategory.description}</p>
              </div>
            )}

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found in this category</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                {products.map((product) => {
                  const cardImage = getProductImage(product);
                  return (
                    <article
                      key={product.id}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="p-4 md:p-6">
                        <h4 className="text-xl md:text-lg font-bold text-slate-900 mb-3 md:mb-2">{product.name}</h4>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="w-full h-44 rounded-lg overflow-hidden bg-slate-100"
                        aria-label={`View details for ${product.name}`}
                      >
                        {cardImage ? (
                          <img src={cardImage} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                            No Image
                          </div>
                        )}
                      </button>
                        <div className="mt-3">
                          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                          {product.specifications && product.specifications.length > 0 && (
                            <div className="space-y-1.5 text-sm">
                              {product.specifications.slice(0, 3).map((spec, index) => (
                                <div key={`${spec.key}-${index}`} className="flex items-start justify-between gap-2 text-slate-700">
                                  <span className="font-semibold text-slate-900 shrink-0">{spec.key}:</span>
                                  <span className="text-right break-words">{spec.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={openContactForm}
                            className="text-center bg-emerald-700 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-800 transition text-sm"
                          >
                            Get Best Price
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="text-center bg-white border border-emerald-700 text-emerald-700 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] bg-black/60 p-3 md:p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden h-full md:h-auto md:max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-200">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 line-clamp-1">{selectedProduct.name}</h3>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                aria-label="Close product details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden bg-slate-100">
                  <div
                    className="relative"
                    onMouseEnter={() => setIsGalleryPaused(true)}
                    onMouseLeave={() => setIsGalleryPaused(false)}
                    onTouchStart={(event) => {
                      setIsGalleryPaused(true);
                      setTouchStartX(event.changedTouches[0]?.clientX ?? null);
                    }}
                    onTouchEnd={(event) => {
                      if (touchStartX == null || selectedProductImages.length < 2) return;
                      const endX = event.changedTouches[0]?.clientX ?? touchStartX;
                      const delta = endX - touchStartX;
                      if (delta > 40) showPrevImage();
                      if (delta < -40) showNextImage();
                      setTouchStartX(null);
                      setTimeout(() => setIsGalleryPaused(false), 800);
                    }}
                  >
                    {selectedProductImages.length > 0 ? (
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 ease-out"
                          style={{ transform: `translateX(-${selectedImageIndex * 100}%)` }}
                        >
                          {selectedProductImages.map((imageUrl, index) => (
                            <img
                              key={`gallery-${index}`}
                              src={imageUrl}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="w-full h-72 md:h-96 object-cover shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-72 md:h-96 flex items-center justify-center text-slate-400">
                        No Image Available
                      </div>
                    )}

                    {selectedProductImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPrevImage}
                          onMouseEnter={() => setIsGalleryPaused(true)}
                          onMouseLeave={() => setIsGalleryPaused(false)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow hover:bg-white"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={showNextImage}
                          onMouseEnter={() => setIsGalleryPaused(true)}
                          onMouseLeave={() => setIsGalleryPaused(false)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow hover:bg-white"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                          {selectedProductImages.map((_, index) => (
                            <button
                              key={`dot-${index}`}
                              type="button"
                              onClick={() => setSelectedImageIndex(index)}
                              onMouseEnter={() => setIsGalleryPaused(true)}
                              onMouseLeave={() => setIsGalleryPaused(false)}
                              className={`h-2 rounded-full transition-all ${
                                selectedImageIndex === index ? 'w-5 bg-white' : 'w-2 bg-white/60'
                              }`}
                              aria-label={`View image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-slate-600 leading-relaxed mb-5">{selectedProduct.description}</p>
                  <div className="space-y-2 mb-6">
                    {selectedProduct.specifications.length > 0 ? (
                      selectedProduct.specifications.map((spec, index) => (
                        <div
                          key={`${spec.key}-${index}`}
                          className="flex justify-between gap-4 py-2 border-b border-slate-100 text-sm"
                        >
                          <span className="font-semibold text-slate-900 capitalize shrink-0">{spec.key}</span>
                          <span className="text-slate-700 text-right break-words">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">Specifications will be updated soon.</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={openContactForm}
                      className="text-center bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
                    >
                      Get Best Price
                    </button>
                    <a
                      href={`tel:${callNumber}`}
                      className="flex items-center justify-center gap-1 bg-slate-100 text-slate-800 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
                    >
                      <Phone size={16} />
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${callNumber.replace('+', '')}?text=${encodeURIComponent(`Hi, I want to enquire about ${selectedProduct.name}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 bg-green-100 text-green-800 py-3 rounded-lg font-semibold hover:bg-green-200 transition"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Related Products</h4>
                {relatedProducts.length === 0 ? (
                  <p className="text-slate-500 text-sm">No related products in this category yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {relatedProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="text-left border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition bg-white"
                      >
                        <div className="h-28 bg-slate-100">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="font-semibold text-sm text-slate-900 line-clamp-2">{product.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
