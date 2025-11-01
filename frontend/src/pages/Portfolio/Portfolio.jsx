import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/Navbar';
import logo from '../../assets/logoSVG.png';

const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.6, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  );
};

const StatCard = ({ number, label, icon, delay }) => (
  <AnimatedSection delay={delay}>
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <motion.h3 
        className="text-5xl font-bold text-blue-400 mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {number}
      </motion.h3>
      <p className="text-gray-300 text-lg">{label}</p>
    </motion.div>
  </AnimatedSection>
);

const TimelineItem = ({ year, title, description, index }) => (
  <AnimatedSection delay={index * 0.2}>
    <motion.div
      whileHover={{ x: 10 }}
      className="flex gap-6 mb-12 relative"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="w-6 h-6 bg-blue-500 rounded-full z-10 shadow-lg shadow-blue-500/50"
        />
        {index !== 2 && (
          <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent" />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all"
        >
          <h4 className="text-3xl font-bold text-blue-400 mb-2">{year}</h4>
          <h5 className="text-xl font-semibold text-white mb-3">{title}</h5>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  </AnimatedSection>
);

const ValueCard = ({ icon, title, description, delay }) => (
  <AnimatedSection delay={delay}>
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all h-full"
    >
      <motion.div
        className="text-6xl mb-6"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-2xl font-bold text-white mb-4">{title}</h4>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  </AnimatedSection>
);

const Portfolio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Static Gradient Background - Teal to Green */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#2c5f5f] via-[#3a7070] to-[#4d8f6f]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center flex flex-col items-center justify-center min-h-[80vh]"
          >
            {/* MC Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="mb-16"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-8 relative filter drop-shadow-2xl">
                {/* MC Logo SVG - Enhanced */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#f0f0f0', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  {/* M */}
                  <path d="M 40 140 L 40 60 L 60 90 L 80 60 L 80 140" 
                        stroke="url(#logoGradient)" 
                        strokeWidth="14" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        filter="url(#shadow)"/>
                  {/* C */}
                  <path d="M 160 80 A 30 30 0 0 0 100 80 L 100 120 A 30 30 0 0 0 160 120" 
                        stroke="url(#logoGradient)" 
                        strokeWidth="14" 
                        fill="none" 
                        strokeLinecap="round"
                        filter="url(#shadow)"/>
                  {/* Diamond/Rhombus accent */}
                  <path d="M 100 40 L 120 60 L 100 80 L 80 60 Z" 
                        fill="url(#logoGradient)"
                        filter="url(#shadow)"/>
                </svg>
              </div>
            </motion.div>

            {/* MC CHEMICALS Text - Enhanced Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-black text-white mb-10 tracking-[0.15em] drop-shadow-2xl"
              style={{ 
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                textShadow: '0 4px 20px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              MC CHEMICALS
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="w-32 h-1 bg-white/30 mb-10"
            />

            {/* Tagline - Enhanced */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="text-2xl md:text-4xl text-white mb-20 font-light px-4 max-w-4xl"
              style={{ 
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                lineHeight: '1.4'
              }}
            >
              "Saving Your Money on Your Commercial Scale"
            </motion.p>

            {/* Bottom Info - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-white text-lg md:text-xl"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-xl">Est. 2009</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Manufacturers & Suppliers</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span><span className="font-bold">Lahore</span>, Pakistan</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-black text-center text-[#2c3e50] mb-6 tracking-tight">
              INTRODUCTION
            </h2>
            
            {/* Decorative Line */}
            <div className="flex justify-center mb-16">
              <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
              <p className="text-justify">
                <span className="font-bold text-gray-900">MC CHEMICALS</span> is a trusted and growth-driven chemical manufacturing and trading company based in Lahore, Pakistan. Established in <span className="font-bold text-gray-900">2009</span>, the company began its journey with just <span className="font-bold text-gray-900">57</span> core cleaning and hygiene products under a small trading setup - driven by a vision to provide better solutions, not just higher prices.
              </p>

              <p className="text-justify">
                Through dedication, innovation, and continuous improvement, <span className="font-bold text-gray-900">MC CHEMICALS</span> has evolved into a comprehensive provider of cleaning, hygiene, and janitorial solutions, proudly serving commercial, industrial, and institutional sectors nationwide.
              </p>

              <p className="text-justify">
                Today, our portfolio exceeds <span className="font-bold text-gray-900">250+</span> products, including <span className="font-bold text-gray-900">70-80</span> in-house manufactured formulations, each developed with precision, research, and practical expertise. Our expansion from trading to manufacturing represents our commitment to local excellence, quality control, and customer trust.
              </p>

              <p className="text-justify">
                In <span className="font-bold text-gray-900">2019</span>, we proudly introduced our flagship brand <span className="font-bold text-gray-900">"Meliora Products"</span>, marking a new era of premium quality, reliability, and performance in professional cleaning care.
              </p>

              <p className="text-justify">
                Under the Meliora label, we deliver a complete range of industrial and housekeeping products designed to meet modern hygiene standards - widely trusted by food outlets, quick-service restaurants <span className="font-bold text-gray-900">(QSRs)</span>, cafés, eateries, and large-scale commercial clients across Pakistan.
              </p>

              <p className="text-justify">
                With a foundation built on innovation, affordability, and customer satisfaction, <span className="font-bold text-gray-900">MC CHEMICALS</span> continues to lead the way as a dependable partner for high-performance cleaning and chemical solutions on every commercial scale.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Growth Journey Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#1e3a3a] via-[#2d5555] to-[#3a6b5f]">
        {/* Floating Chemical Molecules Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Animated beaker/flask icon */}
        <motion.div
          className="absolute left-10 top-10 opacity-5"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 22q-.825 0-1.413-.588T4 20V10h2v10h12v-10h2v10q0 .825-.588 1.413T18 22H6zm3-14v-3H7V3h10v2h-2v3h3l-3 8H9l-3-8h3zm2 0h2V5h-2v3z"/>
          </svg>
        </motion.div>

        <motion.div
          className="absolute right-10 bottom-10 opacity-5"
          animate={{
            rotate: [0, -5, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 2v2h1v14a4 4 0 0 0 4 4 4 4 0 0 0 4-4V4h1V2H7m4 14c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m2-4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1m1-5h-4V4h4v3z"/>
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Top text with counter animation */}
          <AnimatedSection>
            <motion.p 
              className="text-2xl md:text-3xl text-white/80 mb-6 font-light text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center justify-center gap-2 flex-wrap">
                <span>From</span>
                <motion.span 
                  className="font-bold text-white text-3xl md:text-4xl"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                >
                  57
                </motion.span>
                <span>products to</span>
                <motion.span 
                  className="font-bold text-white text-3xl md:text-4xl"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                >
                  250+
                </motion.span>
                <span>solutions</span>
              </span>
            </motion.p>
          </AnimatedSection>

          {/* Main Title with gradient underline */}
          <AnimatedSection delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                A Journey of Growth
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300">
                  & Excellence
                </span>
              </h2>
              
              {/* Animated Progress Line */}
              <div className="flex justify-center items-center mt-8 mb-12">
                <motion.div 
                  className="relative w-full max-w-2xl h-2 bg-white/20 rounded-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
                  />
                  
                  {/* Starting point marker */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-bold text-white bg-green-600 px-3 py-1 rounded-full">2009</span>
                    </div>
                  </motion.div>
                  
                  {/* Ending point marker */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-teal-400 rounded-full border-4 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 2 }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-bold text-white bg-teal-500 px-3 py-1 rounded-full">2025</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  <motion.div
                    className="text-5xl font-black text-white mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1, type: "spring" }}
                  >
                    16+
                  </motion.div>
                  <p className="text-white/80 text-lg">Years of Excellence</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  <motion.div
                    className="text-5xl font-black text-white mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
                  >
                    70-80
                  </motion.div>
                  <p className="text-white/80 text-lg">In-House Formulations</p>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  <motion.div
                    className="text-5xl font-black text-white mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
                  >
                    250+
                  </motion.div>
                  <p className="text-white/80 text-lg">Total Products</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Us & Timeline Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* About Us Title */}
          <AnimatedSection>
            <h2 className="text-5xl md:text-6xl font-black text-center text-[#2c3e50] mb-6 tracking-tight">
              ABOUT US
            </h2>
            
            {/* Decorative Line */}
            <div className="flex justify-center mb-16">
              <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
            </div>

            {/* About Us Description */}
            <div className="max-w-5xl mx-auto mb-20">
              <p className="text-center text-gray-700 text-xl leading-relaxed">
                <span className="font-bold text-gray-900">MC CHEMICALS</span> began its journey in <span className="font-bold text-gray-900">2009</span> as a small trading business with a vision far beyond profit — a vision to provide people with reliable and affordable chemical solutions they could truly trust. Founded by <span className="font-bold text-gray-900">Mr. Asghar Ali Warraich</span>, along with a dedicated team of professionals, the company was built on values of honesty, hard work, and customer care.
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical line for desktop, hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-teal-500 to-blue-500"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* 2009 - Foundation */}
              <AnimatedSection delay={0.1}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative md:flex md:items-center md:justify-end md:w-1/2 md:pr-12"
                >
                  {/* Green accent bar */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 md:hidden"></div>
                  
                  <div className="ml-8 md:ml-0 bg-white rounded-2xl p-8 shadow-xl border-l-4 border-green-500 hover:shadow-2xl transition-shadow relative">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-2">
                      Foundation <span className="text-green-600">2009</span>
                    </h3>
                    <p className="text-gray-700 text-lg">
                      <span className="font-bold text-gray-900">MC CHEMICALS</span> established as a small trading business with <span className="font-bold text-gray-900">57</span> core cleaning products.
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* 2011 - Manufacturing Expansion */}
              <AnimatedSection delay={0.2}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative md:flex md:items-center md:w-1/2 md:ml-auto md:pl-12"
                >
                  {/* Green accent bar */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-600 md:hidden"></div>
                  
                  <div className="ml-8 md:ml-0 bg-white rounded-2xl p-8 shadow-xl border-l-4 border-teal-500 hover:shadow-2xl transition-shadow relative">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-2">
                      Manufacturing Expansion <span className="text-teal-600">2011</span>
                    </h3>
                    <p className="text-gray-700 text-lg">
                      Expanded into manufacturing operations with a wide range of commercial and industrial cleaning products.
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* 2016 - Janitorial Services */}
              <AnimatedSection delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative md:flex md:items-center md:justify-end md:w-1/2 md:pr-12"
                >
                  {/* Green accent bar */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-cyan-600 md:hidden"></div>
                  
                  <div className="ml-8 md:ml-0 bg-white rounded-2xl p-8 shadow-xl border-l-4 border-cyan-500 hover:shadow-2xl transition-shadow relative">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-2">
                      Janitorial Services <span className="text-cyan-600">2016</span>
                    </h3>
                    <p className="text-gray-700 text-lg">
                      Diversified into janitorial services, serving universities and institutional clients.
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* 2019 - Meliora Brand Launch */}
              <AnimatedSection delay={0.4}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative md:flex md:items-center md:w-1/2 md:ml-auto md:pl-12"
                >
                  {/* Green accent bar */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 md:hidden"></div>
                  
                  <div className="ml-8 md:ml-0 bg-white rounded-2xl p-8 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-shadow relative">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#2c3e50] mb-2">
                      Meliora Brand Launch <span className="text-blue-600">2019</span>
                    </h3>
                    <p className="text-gray-700 text-lg">
                      Introduced flagship brand "Meliora Products" for premium quality cleaning solutions.
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>

              {/* 2025 - Present Day */}
              <AnimatedSection delay={0.5}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="relative md:flex md:items-center md:justify-end md:w-1/2 md:pr-12"
                >
                  {/* Green accent bar */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-600 md:hidden"></div>
                  
                  <div className="ml-8 md:ml-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 shadow-2xl text-white hover:shadow-3xl transition-shadow relative overflow-hidden">
                    <motion.div
                      className="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full opacity-10"
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 relative z-10">
                      Present Day <span className="text-yellow-300">2025</span>
                    </h3>
                    <p className="text-white/90 text-lg relative z-10">
                      Operating across multiple cities with <span className="font-bold text-yellow-300">250+</span> products and expanding into international markets.
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>

          {/* Current Operations */}
          <AnimatedSection delay={0.6}>
            <div className="mt-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8"
              >
                Today, <span className="font-bold text-white">MC CHEMICALS</span> operates actively across{" "}
                <span className="font-bold text-blue-400">Lahore, Kasur, Sheikhupura, Gujranwala, Faisalabad,</span> and{" "}
                <span className="font-bold text-blue-400">Okara</span>, earning recognition for premium quality, responsible dealings, and strong customer relationships. Our clients value us for our sincerity, quality assurance, and the importance we give to their feedback.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-200 leading-relaxed"
              >
                As we look ahead, our focus remains on continuous improvement and expansion — strengthening our janitorial services, ensuring uncompromised quality, and stepping confidently into international export markets. Every product we create and every service we deliver reflects our belief that true success lies not in profit, but in the satisfaction and trust of our customers.
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Floating chemical elements background */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <svg className="w-16 h-16 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="5" r="2" />
                <circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="12" r="2" />
              </svg>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black text-[#2c3e50] mb-4 tracking-tight">
                MISSION & VISION
              </h2>
              <div className="flex justify-center">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 rounded-full"></div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Mission Statement Card */}
            <AnimatedSection delay={0.2}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full border-t-8 border-green-600"
              >
                {/* Green header */}
                <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 relative overflow-hidden">
                  <motion.div
                    className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-black text-white">
                      MISSION STATEMENT
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our mission at <span className="font-bold text-gray-900">MC CHEMICALS</span> is to deliver premium-quality cleaning and hygiene solutions that help our clients maintain safe, spotless, and efficient environments — all while keeping their costs under control.
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      We are committed to:
                    </h4>
                    
                    <ul className="space-y-4">
                      {[
                        "Manufacturing high-performance chemical products that meet professional standards of safety and effectiveness.",
                        "Providing honest pricing and reliable after-sales support, ensuring every client feels valued and satisfied.",
                        "Listening carefully to customer feedback and continuously improving our products and services.",
                        "Upholding integrity and quality in every step — from formulation to final delivery.",
                        "Building long-term partnerships based on trust, care, and consistent performance."
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <motion.span
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            className="mt-1.5 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
                          />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border-l-4 border-green-600"
                  >
                    <p className="text-gray-800 italic leading-relaxed">
                      Guided by passion and responsibility, <span className="font-bold text-gray-900">MC CHEMICALS</span> believes that true success is not achieved through profit alone, but through customer trust, product excellence, and a genuine commitment to serve.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Vision Statement Card */}
            <AnimatedSection delay={0.4}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full border-t-8 border-blue-600"
              >
                {/* Blue header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 bottom-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                  />
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-black text-white">
                      VISION STATEMENT
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To position <span className="font-bold text-gray-900">MC CHEMICALS</span> as the regional benchmark for innovative and sustainable cleaning solutions — trusted for superior quality, engineering performance, and ready to compete on the global stage. We will achieve this by combining disciplined research, scalable service models, and responsible manufacturing to deliver measurable value to clients while safeguarding people and the environment.
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      Strategic Vision Objectives
                    </h4>
                    
                    <ul className="space-y-4">
                      {[
                        {
                          title: "Expand market presence regionally and enter selected international markets with export-ready product lines.",
                          icon: "🌍"
                        },
                        {
                          title: "Innovate eco-conscious formulations that meet international safety and environmental standards.",
                          icon: "🧪"
                        },
                        {
                          title: "Scale and professionalize janitorial services to serve commercial and industrial clients at national level.",
                          icon: "🏢"
                        },
                        {
                          title: "Invest continuously in R&D and quality assurance to maintain product efficacy and regulatory compliance.",
                          icon: "🔬"
                        },
                        {
                          title: "Build resilient supply chains and strategic commercial alliances to ensure timely delivery and competitive advantage.",
                          icon: "🤝"
                        }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <motion.span
                            whileHover={{ scale: 1.3 }}
                            className="text-2xl flex-shrink-0"
                          >
                            {item.icon}
                          </motion.span>
                          <span>{item.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                CORE VALUES
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                At <span className="font-bold text-white">MC CHEMICALS</span>, our core values define who we are, how we work, and what we stand for. They guide our decisions, strengthen our relationships, and shape our journey toward excellence.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                title: "Integrity — Doing What's Right",
                description: "We uphold honesty and fairness in every action, building trust with clients, employees, and partners through transparency and ethical conduct.",
                icon: "✓",
                color: "from-green-500 to-emerald-600",
                delay: 0.1
              },
              {
                title: "Quality Without Compromise",
                description: "We deliver reliable products and services that meet the highest standards of safety, consistency, and performance — because quality is our signature.",
                icon: "★",
                color: "from-blue-500 to-cyan-600",
                delay: 0.2
              },
              {
                title: "Customer Focus — Centered on Your Success",
                description: "Our clients are at the heart of everything we do. We listen, understand, and respond with personalized, cost-effective solutions that create real value.",
                icon: "♥",
                color: "from-purple-500 to-pink-600",
                delay: 0.3
              },
              {
                title: "Sustainability — Clean Today, Green Tomorrow",
                description: "We are dedicated to environmentally responsible practices, promoting safe chemical usage and sustainable production methods.",
                icon: "🌱",
                color: "from-teal-500 to-green-600",
                delay: 0.4
              },
              {
                title: "Innovation That Inspires",
                description: "We continuously explore smarter technologies and improved formulations to bring effective, sustainable, and forward-thinking cleaning solutions.",
                icon: "💡",
                color: "from-yellow-500 to-orange-600",
                delay: 0.5
              },
              {
                title: "Teamwork — United for Excellence",
                description: "We believe success is built on collaboration. Our team of skilled professionals works with dedication, respect, and shared purpose to achieve common goals.",
                icon: "🤝",
                color: "from-indigo-500 to-blue-600",
                delay: 0.6
              },
              {
                title: "Accountability — We Stand by Our Commitments",
                description: "We take full responsibility for our promises, ensuring reliability, consistency, and customer satisfaction in every project and partnership.",
                icon: "⚡",
                color: "from-red-500 to-rose-600",
                delay: 0.7
              },
              {
                title: "Continuous Growth & Improvement",
                description: "We learn, adapt, and evolve — constantly raising our standards to stay ahead in performance, innovation, and service quality.",
                icon: "📈",
                color: "from-cyan-500 to-teal-600",
                delay: 0.8
              }
            ].map((value, index) => (
              <AnimatedSection key={index} delay={value.delay}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: value.delay }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all shadow-xl hover:shadow-2xl h-full"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 mb-4 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg relative z-10`}
                  >
                    {value.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                    {value.description}
                  </p>

                  {/* Decorative corner element */}
                  <motion.div
                    className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${value.color} opacity-0 group-hover:opacity-20 rounded-tl-full transition-opacity duration-300`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-white/30 text-xs font-bold">
                    {index + 1}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom Message */}
          <AnimatedSection delay={1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  These values are not just words on a page — they are the foundation of every decision we make, every relationship we build, and every solution we deliver.
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Target Clients Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <svg className="w-24 h-24 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-7xl font-black text-[#2c3e50] mb-6 tracking-tight">
                TARGET CLIENTS
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                At <span className="font-bold text-gray-900">MC CHEMICALS</span>, we cater to a wide range of industries that rely on our premium cleaning solutions, janitorial services, and specialized chemical products. Our commitment to excellence, reliability, and cost efficiency has made us a trusted partner across multiple business sectors.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Clients Grid - Pinterest Style */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-16 space-y-6">
            {/* Food & Hospitality Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-green-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  Food & Hospitality Sector
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Food Outlets & QSRs:</span> Maintaining hygienic and compliant environments in high-traffic kitchens.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Cafés & Eateries:</span> Enhancing freshness and hygiene through tailored cleaning solutions.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Hotels & Motels:</span> Supporting exceptional guest experiences with superior cleanliness.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Catering Services:</span> Ensuring safe food handling through effective sanitation systems.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Educational & Institutional Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-blue-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  Educational & Institutional Sector
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Schools, Colleges & Universities:</span> Delivering efficient janitorial management for safe learning spaces.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Corporate & Commercial Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-purple-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  Corporate & Commercial Sector
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Corporate Offices & Business Centers:</span> Offering professional-grade maintenance for clean, productive workspace.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Shopping Malls & Retail Chains:</span> Preserving brand image through spotless, inviting environments.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Entertainment & Leisure Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-orange-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎪</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  Entertainment & Leisure Sector
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Sports Complexes & Gyms:</span> Promoting hygiene and safety through reliable cleaning solutions.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-orange-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Event Venues & Banquet Halls:</span> Supporting smooth operations with professional janitorial care.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Industrial & Manufacturing Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-teal-600"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  Industrial & Manufacturing Sector
                </h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-teal-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Factories & Production Units:</span> Supplying industrial-grade cleaning and safety solutions.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-teal-600 rounded-full flex-shrink-0"></span>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Warehouses & Logistics Hubs:</span> Maintaining cleanliness and order in high-volume facilities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 shadow-xl">
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                — empowering cleaner, safer, and more efficient environments across diverse industries.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Clients Trust Us For Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight">
                OUR CLIENTS TRUST US FOR
              </h2>
              <div className="flex justify-center">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Trust Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Cost-Effective Excellence",
                description: "Delivering premium-quality solutions that optimize performance without exceeding budgets.",
                icon: "💰",
                delay: 0.1
              },
              {
                title: "Reliable Supply & Support",
                description: "Ensuring timely deliveries, consistent availability, and responsive customer care.",
                icon: "🚚",
                delay: 0.2
              },
              {
                title: "Tailored Product Solutions",
                description: "Recommending the right formulations and cleaning systems for every commercial requirement.",
                icon: "🎯",
                delay: 0.3
              },
              {
                title: "Professional Janitorial Management",
                description: "Providing measurable, results-driven services that maintain hygiene and operational efficiency.",
                icon: "✨",
                delay: 0.4
              },
              {
                title: "Commitment to Quality",
                description: "Upholding industry standards through rigorous testing, continuous improvement, and customer feedback.",
                icon: "⭐",
                delay: 0.5
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-green-600 group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-4xl mb-6 group-hover:bg-green-100 transition-colors"
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#2c3e50] mb-4 group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-6 w-12 h-1 bg-green-600 rounded-full"
                  initial={{ width: 48 }}
                  whileHover={{ width: 80 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Cleaning & Maintenance Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight leading-tight">
                PROFESSIONAL CLEANING &<br />MAINTENANCE SERVICES
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                At <span className="font-bold text-gray-900">MC CHEMICALS</span>, we go beyond supplying cleaning products — we deliver specialized cleaning and maintenance services designed for homes, businesses, and industries. Our trained teams use modern equipment, eco-friendly solutions, and proven techniques to ensure outstanding results, hygiene, and long-term protection.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Carpet Washing",
                tagline: "Protect your investment in deep-clean carpets.",
                description: "Revitalize your carpets with our professional washing service. Using advanced cleaning systems and eco-safe formulas, we remove dust, stains, and allergens — leaving carpets fresh, soft, and renewed.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 3h20v2H2V3m0 16h20v2H2v-2m18-8c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4m-7 0c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"/>
                  </svg>
                ),
                delay: 0.1
              },
              {
                title: "Sofa Cleaning",
                tagline: "Experience comfort with freshness.",
                description: "Our expert sofa cleaning service eliminates embedded dirt, odors, and stains while preserving fabric quality — ensuring your furniture stays hygienic and looks brand-new.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18,10V7c0-1.1-0.9-2-2-2H8C6.9,5,6,5.9,6,7v3c-1.1,0-2,0.9-2,2v5h2v2h2v-2h8v2h2v-2h2v-5C20,10.9,19.1,10,18,10z M8,7h8v3.2C15.4,10.1,14.7,10,14,10h-4c-0.7,0-1.4,0.1-2,0.2V7z"/>
                  </svg>
                ),
                delay: 0.2
              },
              {
                title: "Tank Washing",
                tagline: "Clean water starts with a clean tank.",
                description: "We provide thorough tank washing services, removing sediment, algae, and contaminants to keep your water safe, fresh, and hygienic.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,3L2,8v3h2v10h16V11h2V8L12,3z M18,19H6V11h12V19z M12,5.5l6,3.3V9h-2H8H6V8.8L12,5.5z"/>
                  </svg>
                ),
                delay: 0.3
              },
              {
                title: "Termite Control",
                tagline: "Protect your property, preserve your peace.",
                description: "Our termite control specialists use advanced, long-lasting treatment to eliminate infestations and prevent future damage to your property.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M12,6c-3.31,0-6,2.69-6,6h2c0-2.21,1.79-4,4-4s4,1.79,4,4c0,2.21-1.79,4-4,4v2c3.31,0,6-2.69,6-6C18,8.69,15.31,6,12,6z"/>
                  </svg>
                ),
                delay: 0.4
              },
              {
                title: "Drain Unblocking",
                tagline: "Fast, reliable, and hygienic.",
                description: "Our drain unblocking service ensures smooth flow by removing clogs, grease, and buildup — preventing overflow and unpleasant odors.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                  </svg>
                ),
                delay: 0.5
              },
              {
                title: "Pool Cleaning",
                tagline: "Crystal clear, ready to dive.",
                description: "We offer complete pool maintenance, from debris removal to chemical balancing — ensuring your pool remains safe, clean, and swim-ready year-round.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2,15c1.67,1.33,3.33,2,5,2s3.33-0.67,5-2c1.67,1.33,3.33,2,5,2s3.33-0.67,5-2v2c-1.67,1.33-3.33,2-5,2s-3.33-0.67-5-2c-1.67,1.33-3.33,2-5,2s-3.33-0.67-5-2V15z M2,19c1.67,1.33,3.33,2,5,2s3.33-0.67,5-2c1.67,1.33,3.33,2,5,2s3.33-0.67,5-2v2c-1.67,1.33-3.33,2-5,2s-3.33-0.67-5-2c-1.67,1.33-3.33,2-5,2s-3.33-0.67-5-2V19z M17,6.23V11c0,2.76-2.24,5-5,5s-5-2.24-5-5V6.23L2,4.45V2.33L12,5l10-2.67v2.12L17,6.23z"/>
                  </svg>
                ),
                delay: 0.6
              },
              {
                title: "Car Detailing",
                tagline: "Precision cleaning, inside and out.",
                description: "Our car detailing service restores your vehicle's shine and freshness — from deep interior cleaning to exterior polishing for a showroom finish.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"/>
                  </svg>
                ),
                delay: 0.7
              },
              {
                title: "Roof Waterproofing",
                tagline: "Stop leaks before they start.",
                description: "We use durable, weather-resistant coatings to protect your roof from moisture, cracks, and seepage — ensuring long-term protection and peace of mind.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                  </svg>
                ),
                delay: 0.8
              },
              {
                title: "Heat Proofing",
                tagline: "Cooler spaces, smarter energy.",
                description: "Our heat-proofing solutions reduce heat absorption and improve energy efficiency, keeping interiors comfortable and cost-effective.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M12.5,7H11v6l5.25,3.15l0.75-1.23l-4.5-2.67V7z"/>
                  </svg>
                ),
                delay: 0.9
              },
              {
                title: "Specialized Pest Control",
                tagline: "Complete protection for every space.",
                description: "We deliver safe, efficient, and long-lasting pest management solutions — including termite, rodent, and insect control — ensuring your premises remain clean, healthy, and pest-free.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                  </svg>
                ),
                delay: 1.0
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: service.delay }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
              >
                {/* Gradient Icon Box */}
                <div className="flex justify-start p-6 pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg"
                  >
                    {service.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-bold text-[#2c3e50] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 mb-3 italic">
                    {service.tagline}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom hover indicator */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-green-600 to-yellow-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Closing Message Box */}
          <AnimatedSection delay={1.1}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-16"
            >
              <div className="bg-gradient-to-r from-[#2c5f5f] via-[#3a7070] to-[#4d8f6f] rounded-2xl p-10 md:p-16 shadow-2xl">
                <p className="text-xl md:text-2xl text-white text-center leading-relaxed">
                  Each service is executed by skilled professionals with precision and care — ensuring quality, safety, and satisfaction. That's the <span className="font-bold text-green-300">MC CHEMICALS</span> promise.
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Portfolio Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight">
                PRODUCTS PORTFOLIO
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
              <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  At <span className="font-bold text-gray-900">MC CHEMICALS</span>, we specialize in manufacturing, trading, and supplying premium-quality cleaning and hygiene products formulated for commercial, industrial, and institutional applications. All products are proudly developed under our trusted in-house brand, Meliora Products (launched in <span className="font-bold text-gray-900">2019</span>), recognized for performance, safety, and cost-efficiency.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Together with our janitorial and maintenance services, we provide a complete cleaning and hygiene solution under one roof.
                </p>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Product Categories */}
          <div className="mt-16 space-y-12">
            {/* Category 1: Cleaning & Hygiene Chemicals */}
            <AnimatedSection delay={0.2}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-green-600 pl-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#2c3e50] mb-2">
                      1. Cleaning & Hygiene Chemicals
                    </h3>
                    <p className="text-gray-600 italic text-lg">
                      Designed for everyday cleaning excellence across industries.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    "Floor Cleaners & Surface Disinfectants",
                    "Toilet Bowl & Washroom Cleaners",
                    "Glass, Tile & Multi-Purpose Cleaners",
                    "Dishwashing Liquids & Degreasers",
                    "Hand Washes & Sanitizers",
                    "Phenyls & Deodorizing Solutions",
                    "Carpet & Upholstery Cleaning Chemicals",
                    "Air Fresheners & Odor Control Products",
                    "Drain & Pipe Cleaning Chemicals"
                  ].map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="bg-gray-50 border-l-2 border-green-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <p className="text-gray-700 text-sm font-medium">{product}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Category 2: Industrial & Institutional Chemicals */}
            <AnimatedSection delay={0.3}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-teal-600 pl-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,3L2,8v3h2v10h16V11h2V8L12,3z M18,19H6V11h12V19z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#2c3e50] mb-2">
                      2. Industrial & Institutional Chemicals
                    </h3>
                    <p className="text-gray-600 italic text-lg">
                      Powerful solutions for heavy-duty cleaning and equipment care.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    "Heavy-Duty Degreasers & Solvent Cleaners",
                    "Industrial Surface & Machinery Cleaners",
                    "Laundry Detergents, Bleaches & Softeners",
                    "Descaling & Rust-Removal Agents",
                    "Kitchen Hygiene & Equipment Care Products",
                    "Floor Strippers, Polishers & Maintainance Agents",
                    "Cooling Tower & Boiler Maintenance Chemicals",
                    "Water Treatment & Disinfection Products"
                  ].map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="bg-gray-50 border-l-2 border-teal-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <p className="text-gray-700 text-sm font-medium">{product}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Category 3: Specialized & Eco-Friendly Products */}
            <AnimatedSection delay={0.4}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-emerald-600 pl-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#2c3e50] mb-2">
                      3. Specialized & Eco-Friendly Products
                    </h3>
                    <p className="text-gray-600 italic text-lg">
                      High-performance innovations designed for modern hygiene standards.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    "Eco-Friendly & Biodegradable Cleaners",
                    "Fragrance-Enhanced Cleaning Liquids",
                    "Concentrated Formulations for Bulk Use",
                    "Hypoallergenic & Food-Safe Cleaning Agents",
                    "Custom Chemical Blends (as per client's requirement)",
                    "Private Labeling & OEM Manufacturing Services"
                  ].map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="bg-gray-50 border-l-2 border-emerald-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <p className="text-gray-700 text-sm font-medium">{product}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Category 4: Janitorial & Support Supplies */}
            <AnimatedSection delay={0.5}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-blue-600 pl-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.71,20.29L20.29,21.71L17,18.42L13.71,21.71L12.29,20.29L15.58,17L12.29,13.71L13.71,12.29L17,15.58L20.29,12.29L21.71,13.71L18.42,17L21.71,20.29M11,18H6V16H11V18M15,14H6V12H15V14M15,10H6V8H15V10M21,4A2,2 0 0,1 23,6V17.8C22.4,17.3 21.7,16.9 21,16.7V6H3V20H11.8C12,20.7 12.4,21.4 12.8,22H3A2,2 0 0,1 1,20V6A2,2 0 0,1 3,4H21Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#2c3e50] mb-2">
                      4. Janitorial & Support Supplies
                    </h3>
                    <p className="text-gray-600 italic text-lg">
                      A complete range of cleaning tools and consumables to complement our chemicals.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    "Mops, Brushes & Cleaning Equipment",
                    "Spray Bottles, Buckets & Wipers",
                    "Waste Bins & Disposable Bags",
                    "Dispensers, Refills & Cleaning Accessories"
                  ].map((product, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="bg-gray-50 border-l-2 border-blue-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <p className="text-gray-700 text-sm font-medium">{product}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Bottom Banner */}
          <AnimatedSection delay={0.6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <div className="bg-gradient-to-r from-[#2c5f5f] via-[#3a7070] to-[#4d8f6f] rounded-2xl p-10 md:p-12 shadow-2xl">
                <p className="text-xl md:text-2xl text-white text-center leading-relaxed">
                  With over <span className="font-bold text-yellow-300">200+</span> products across multiple categories, <span className="font-bold text-green-300">MC CHEMICALS</span> proudly stands as a one-stop hygiene and cleaning solutions provider, trusted by industries, institutions, and service providers nationwide.
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trusted Chemical Suppliers Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight leading-tight">
                TRUSTED CHEMICAL SUPPLIERS &<br />STRATEGIC PROCUREMENT PARTNERS
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
              <div className="max-w-5xl mx-auto">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  At <span className="font-bold text-gray-900">MC CHEMICALS</span>, we take great pride in maintaining long-term partnerships with some of Pakistan's most reputable and established chemical manufacturers. Our procurement strategy is built on reliability, transparency, and quality — ensuring that every product we supply meets the highest industrial standards. Through these alliances, <span className="font-bold text-gray-900">MC CHEMICALS</span> continues to strengthen its supply chain, uphold consistency, and deliver chemical solutions that meet the diverse needs of our valued clients.
                </p>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Partners Table */}
          <AnimatedSection delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mt-16 overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#2c5f5f] via-[#3a7070] to-[#4d8f6f]">
                      <th className="px-6 py-4 text-left text-white font-bold text-lg w-20">#</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-lg">Company Name</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-lg">Location</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[
                      { name: "Lucky Core Industries Limited", location: "Karachi / Lahore", country: "Pakistan" },
                      { name: "Ittehad Chemicals Limited", location: "Lahore", country: "Pakistan" },
                      { name: "Sitara Chemical Industries Limited", location: "Faisalabad", country: "Pakistan" },
                      { name: "Lotte Chemical Pakistan Limited", location: "Karachi", country: "Pakistan" },
                      { name: "Nimir Industrial Chemicals Limited", location: "Lahore", country: "Pakistan" },
                      { name: "Olympia Chemicals Ltd.", location: "Lahore / Khushab", country: "Pakistan" },
                      { name: "Descon Oxychem Ltd.", location: "Lahore", country: "Pakistan" },
                      { name: "Tufail Chemical Industries Ltd.", location: "Karachi", country: "Pakistan" },
                      { name: "Rafhan Maize Products Company Ltd.", location: "Faisalabad", country: "Pakistan" },
                      { name: "BASF Pakistan (Pvt.) Ltd.", location: "Karachi", country: "Pakistan" }
                    ].map((partner, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ backgroundColor: "#f0fdf4" }}
                        className="border-b border-gray-200 hover:bg-green-50 transition-colors"
                      >
                        <td className="px-6 py-5 text-gray-900 font-semibold">{idx + 1}</td>
                        <td className="px-6 py-5 text-gray-900 font-semibold">{partner.name}</td>
                        <td className="px-6 py-5 text-gray-700">
                          <span className="font-bold text-gray-900">{partner.location}</span>, {partner.country}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Bottom Statement */}
          <AnimatedSection delay={0.5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="mt-12 border-l-4 border-green-600 pl-8 py-4"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                <span className="font-bold text-gray-900">MC CHEMICALS</span> values these strategic relationships as the foundation of our continued growth and customer trust — ensuring sustainable, efficient, and high-quality supply across all our operations.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Brand - Meliora Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight">
                OUR BRAND – "MELIORA"
              </h2>
              <div className="flex justify-center">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Content Grid */}
          <div className="grid md:grid-cols-12 gap-8 mt-12">
            {/* Left - Brand Logo */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start">
              <div className="border-l-4 border-green-600 pl-8">
                {/* Meliora Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-8"
                >
                  <img 
                    src={logo} 
                    alt="Meliora Logo" 
                    className="w-64 h-auto filter drop-shadow-2xl"
                  />
                </motion.div>

                {/* Tagline */}
                <p className="text-2xl text-gray-600 italic mt-4">
                  "Always Better"
                </p>
              </div>
            </div>

            {/* Right - Content */}
            <div className="md:col-span-8 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                "Meliora" — derived from the Latin word meaning "always better" — represents the spirit of continuous improvement and excellence that drives <span className="font-bold text-gray-900">MC CHEMICALS</span>.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Launched in <span className="font-bold text-gray-900">2019</span>, Meliora has become our signature brand, symbolizing trust, quality, and performance across Pakistan's cleaning and hygiene industry.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                With <span className="font-bold text-gray-900">52</span> registered products under the Meliora label — and <span className="font-bold text-gray-900">17</span> already in full-scale professional operation — the brand reflects our deep commitment to innovation and perfection. Each product is the result of advanced formulation, research, and quality testing, ensuring consistent performance in housekeeping, institutional, and industrial cleaning applications.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                At Meliora, we combine science, safety, and practicality to deliver solutions that not only meet international hygiene benchmarks but also ensure cost efficiency and client satisfaction on every commercial scale.
              </p>

              {/* Brand Values */}
              <div className="flex flex-wrap items-center gap-6 pt-6">
                {[
                  { label: "Premium Quality", icon: "✓" },
                  { label: "Reliability", icon: "✓" },
                  { label: "Performance", icon: "✓" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 bg-green-50 px-6 py-3 rounded-full border-2 border-green-600"
                  >
                    <span className="text-green-600 font-bold text-xl">{item.icon}</span>
                    <span className="font-bold text-gray-900">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-2xl p-10 md:p-12 shadow-2xl">
              <h3 className="text-3xl md:text-5xl text-white font-bold text-center leading-tight">
                Better Cleaning, Smarter Chemistry, Lasting Value
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight">
                CONTACT INFORMATION
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                We value your interest in <span className="font-bold text-gray-900">MC CHEMICALS</span> — a trusted name in industrial and commercial cleaning solutions. For business inquiries, partnerships, or product information, please connect with us through the following channels:
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Left - Head Office */}
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[#2c3e50]">
                    Head Office
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-gray-900 text-xl mb-2">MC CHEMICALS</p>
                    <p className="text-gray-700 text-lg">89/6 - Quaid-e-Azam Industrial Area</p>
                    <p className="text-gray-700 text-lg">
                      <span className="font-bold text-gray-900">Lahore</span>, Pakistan
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 text-lg">
                      <span className="font-semibold text-gray-900">Year Established:</span> <span className="font-bold text-gray-900 text-xl">2009</span>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="mt-8 bg-gradient-to-r from-[#2c5f5f] to-[#4d8f6f] rounded-xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xl font-bold">Business Hours</h4>
                  </div>
                  <p className="text-lg mb-2">
                    Monday – Saturday | <span className="font-bold">9:00 AM – 6:00 PM</span>
                  </p>
                  <p className="text-white/80">
                    (Closed on Sundays & Public Holidays)
                  </p>
                </div>
              </div>

            {/* Right - Contact Details & Stay Connected */}
            <div className="space-y-6">
                {/* Contact Details */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-[#2c3e50]">
                      Contact Details
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone:</p>
                        <a href="tel:+923204023398" className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                          +92 320 402 3398
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email:</p>
                        <a href="mailto:mcchemical92@gmail.com" className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors break-all">
                          mcchemical92@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Website:</p>
                        <a href="https://www.melioraproducts.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors">
                          www.melioraproducts.com
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Stay Connected */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">
                    Stay Connected
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Follow <span className="font-bold text-gray-900">MC CHEMICALS</span> and Meliora Products on our official digital platforms for the latest updates, product launches, and professional cleaning insights.
                  </p>

                  {/* Social Media Links */}
                  <div className="flex flex-wrap gap-4">
                    {[
                      { name: "Facebook", icon: "📘", url: "#" },
                      { name: "Instagram", icon: "📷", url: "#" },
                      { name: "LinkedIn", icon: "💼", url: "#" },
                      { name: "WhatsApp", icon: "💬", url: "https://wa.me/923204023398" }
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 px-5 py-3 rounded-full border-2 border-green-600 transition-colors group"
                      >
                        <span className="text-2xl">{social.icon}</span>
                        <span className="font-semibold text-gray-900 group-hover:text-green-700">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2c5f5f] via-[#3a7070] to-[#4d8f6f]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p className="text-2xl md:text-3xl text-white font-light italic">
                  Your cleanliness is our commitment.
                </p>
              </div>

              <h3 className="text-3xl md:text-5xl text-white font-bold leading-tight">
                We look forward to serving you with excellence, reliability, and innovation — the <span className="text-green-300 font-black">MC CHEMICALS</span> way.
              </h3>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing Note Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-black text-[#2c3e50] mb-6 tracking-tight">
                CLOSING NOTE
              </h2>
              <div className="flex justify-center mb-12">
                <div className="w-32 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-orange-500 rounded-full"></div>
              </div>

              <div className="max-w-5xl mx-auto border-l-4 border-green-600 pl-8 text-left">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    At <span className="font-bold text-gray-900">MC CHEMICALS</span>, transparency and professionalism are at the core of our operations. We ensure complete confidence and reliability in every product we offer.
                  </p>
                  <p>
                    Should you require any Official Documentation, such as Product certifications, Lab reports, Certificates of Analysis (CA), Quality Assurance Certificates (QAC), Safety Data Sheets (SDS), or compliance records, our team will promptly provide all relevant materials upon request.
                  </p>
                </div>
              </div>

              {/* Your trust box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12 inline-block"
              >
                <div className="bg-[#2c5f5f] text-white px-12 py-6 rounded-xl shadow-2xl">
                  <p className="text-2xl md:text-3xl font-bold">
                    Your trust is our greatest achievement
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wider">
                MC CHEMICALS
              </h3>
              <p className="text-xl text-gray-400 mb-6">
                A trusted name in industrial and commercial cleaning solutions
              </p>
              <div className="flex items-center justify-center gap-4 text-gray-400 text-lg mb-8">
                <span>Since <span className="font-bold text-white">2009</span></span>
              </div>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-500">
                  © <span className="font-bold text-white">2025</span> MC CHEMICALS. All Rights Reserved.
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

