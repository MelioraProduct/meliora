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
    <div className='relative min-h-screen bg-gradient-to-br from-white via-primary-100 to-primary-200'>
      {/* Multiple layered gradients for rich color effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-300/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-200/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-100/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-primary-400/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
      
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section id='home' className="min-h-screen flex items-center justify-center relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/65 to-white/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-transparent to-white/55"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-100/15 via-transparent to-transparent"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 z-10">
          <motion.div
            {...fadeIn}
            className="flex flex-col gap-4 items-center justify-center text-center">
            <img
              src={logo}
              alt='Meliora Logo'
              className='w-60 md:w-72 mb-8'
              loading="eager"
            />
            <h1 className="text-3xl md:text-7xl font-bold text-gray-900">
              Meliora Products
            </h1>
            <p className="text-xl md:text-4xl text-gray-700 py-4">
              {words[0]} {/* Static text instead of animation */}
            </p>
            <p className="text-base md:text-2xl text-gray-600 py-4">
              Elevating Cleanliness, Empowering Excellence.
            </p>
            <motion.button 
              onClick={scrollToProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 text-white rounded-full px-8 py-3 font-medium hover:from-primary-700 hover:via-primary-600 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              Shop now
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Lazy loaded sections */}
      <Suspense fallback={<LoadingFallback />}>
        <section id='products' className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-200/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_var(--tw-gradient-stops))] from-primary-300/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(-135deg,_var(--tw-gradient-stops))] from-primary-400/20 via-transparent to-transparent"></div>
          <div id="products-section" className="relative">
            <Products />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='wholeSale' className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
          {/* Enhanced gradient background for wholesale section */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-300/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-200/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-primary-400/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-100/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_var(--tw-gradient-stops))] from-primary-300/20 via-transparent to-transparent"></div>
          <div className="relative">
            <WholeSale />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <div className='relative z-10' id='whyus'>
          <WaveAd />
        </div>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='blogs' className="relative bg-gradient-to-br from-white via-primary-50 to-primary-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-200/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-100/30 via-transparent to-transparent"></div>
          <div className="relative">
            <Blogs />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <section id='reviews' className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-300/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-200/30 via-transparent to-transparent"></div>
          <div className="relative">
            <Reviews />
          </div>
        </section>
      </Suspense>

      {/* WhatsApp Link positioned at bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppLink />
      </div>
    </div>
  );
};

export default Home;
