import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import React from "react";
import logo from "../assets/logoSVG.png";
import Navbar from "../components/Navbar";
import WhatsAppLink from "../components/WhatsAppLink";

// Lazy load heavy components
const Products = lazy(() => import("../components/Products").then(module => ({ default: module.default })));
const Reviews = lazy(() => import("../components/Reviews").then(module => ({ default: module.default })));
const Blogs = lazy(() => import("../components/Blogs").then(module => ({ default: module.default })));
const WholeSale = lazy(() => import("../components/WholeSale").then(module => ({ default: module.default })));
const WaveAd = lazy(() => import("../components/WaveAd").then(module => ({ default: module.WaveAd })));

// Simplified animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const words = [
  "Eco-Friendly Solutions",
  "Advanced Cleaning Tech",
  "High-Efficiency",
  "Industrial Strength",
  "Safe for Home Use",
  "Surface Protection",
  "Fast-Acting Formulas",
  "Non-Toxic Ingredients",
  "Odor Neutralization",
  "Multi-Purpose Use",
  "Long-Lasting",
  "Cost-Effective Solutions",
  "Heavy-Duty Cleaning",
  "Stain Removal",
];

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const Home = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative bg-gradient-to-b from-slate-900 to-slate-800'>
      <Navbar />
      
      {/* Hero Section */}
      <section id='home' className="min-h-screen flex items-center justify-center relative">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Professional Cleaning Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-800/80"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.div
            {...fadeIn}
            className="flex flex-col gap-4 items-center justify-center text-center">
            <img
              src={logo}
              alt='Meliora Logo'
              className='w-60 md:w-72 mb-8'
              loading="eager"
            />
            <h1 className="text-3xl md:text-7xl font-bold text-white">
              Meliora Products
            </h1>
            <p className="text-xl md:text-4xl text-neutral-200 py-4">
              {words[0]}
            </p>
            <p className="text-lg md:text-xl text-neutral-300">
              Elevating Cleanliness, Empowering Excellence.
            </p>
            <button 
              onClick={scrollToProducts}
              className="bg-blue-600 text-white rounded-full px-6 py-3 font-medium hover:bg-blue-700 transition-all">
              Shop now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lazy loaded sections */}
      <Suspense fallback={<LoadingFallback />}>
        <section id='products' className="bg-gradient-to-b from-slate-800 to-slate-900">
          <div id="products-section">
            <Products />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='wholeSale' className="bg-gradient-to-b from-slate-900 to-slate-800">
          <WholeSale />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div className='relative z-10' id='whyus'>
          <WaveAd />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='blogs'>
          <Blogs />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='reviews'>
          <Reviews />
        </section>
      </Suspense>

      {/* WhatsApp Link */}
      <div className="fixed bottom-8 right-8 z-50">
        <WhatsAppLink />
      </div>
    </div>
  );
};

export default Home;
