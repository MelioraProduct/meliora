import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import React from "react";
import logo from "../assets/logoSVG.png";
import Navbar from "../components/Navbar";
import WhatsAppLink from "../components/WhatsAppLink";
import { FaArrowRight } from "react-icons/fa";

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
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
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
    <div className='relative bg-gradient-to-b from-slate-50 to-slate-100'>
      <Navbar />
      
      {/* Hero Section */}
      <section id='home' className="min-h-screen flex items-center justify-center relative">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070"
            alt="Professional Cleaning Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-slate-100/80"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.div
            {...fadeIn}
            className="flex flex-col gap-4 items-center justify-center text-center">
            <img
              src={logo}
              alt='Meliora Logo'
              className='w-60 md:w-72 mb-8 drop-shadow-lg'
              loading="eager"
            />
            <h1 className="text-3xl md:text-7xl font-bold text-slate-800 drop-shadow-sm">
              Meliora Products
            </h1>
            <p className="text-xl md:text-4xl text-slate-600 py-4 font-medium">
              {words[0]}
            </p>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl">
              Elevating Cleanliness, Empowering Excellence.
            </p>
            <button 
              onClick={scrollToProducts}
              className="bg-blue-500 text-white rounded-full px-8 py-4 font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl text-lg">
              Shop now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lazy loaded sections */}
      <Suspense fallback={<LoadingFallback />}>
        <section id='products' className="bg-gradient-to-br from-pink-50 via-sky-50 to-blue-50">
          <div id="products-section">
            <Products />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='wholeSale' className="bg-gradient-to-br from-pink-50 via-sky-50 to-blue-50">
          <WholeSale />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div className='relative z-10' id='whyus'>
          <WaveAd />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='blogs' className="bg-slate-50">
          <Blogs />
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='reviews' className="bg-slate-100">
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
