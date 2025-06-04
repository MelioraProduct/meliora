import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      <section id='home' className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Professional Cleaning Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4 items-center justify-center text-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={logo}
              alt='Meliora Logo'
              className='w-60 md:w-72 mb-8'
              loading="eager"
            />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl md:text-7xl font-bold text-white">
              Meliora Products
            </motion.h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-4xl text-neutral-200 py-4"
              >
                {words[currentWordIndex]}
              </motion.p>
            </AnimatePresence>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-neutral-300">
              Elevating Cleanliness, Empowering Excellence.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToProducts}
              className="bg-blue-600 text-white rounded-full px-8 py-4 font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
              Shop now
            </motion.button>
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
