import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeHighlights } from './components/HomeHighlights';
import { Testimonials } from './components/Testimonials';
import { Shop } from './components/Shop';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const StudioPage = lazy(() => import('./pages/StudioPage'));

function App() {
  const path = window.location.pathname.toLowerCase();
  const isShopPage = path === '/shop';
  const isServicesPage = path === '/services';
  const isStudioPage = path === '/studio' || path.startsWith('/studio/');

  if (isStudioPage) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Studio...</div>}>
        <StudioPage />
      </Suspense>
    );
  }

  if (isShopPage) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <Navbar />
        <Shop />
        <Contact />
        <Footer />
      </div>
    );
  }

  if (isServicesPage) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <Navbar />
        <Services />
        <Contact />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <Hero />
      <HomeHighlights />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
