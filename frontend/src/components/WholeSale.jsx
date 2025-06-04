import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const WholeSale = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/package");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Wholesale Packages
        </h1>
        <div className="text-center text-xl font-medium text-gray-400">
          No packages available at the moment
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Wholesale Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold">
                {pkg.name}
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="text-4xl font-bold mb-4">
                ${pkg.price}
                <span className="text-lg text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 mb-8">{pkg.description}</p>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <FaCheck className="text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center w-full px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full overflow-hidden">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-white/10"></span>
                <span className="relative flex items-center justify-center gap-2">
                  Get Started
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WholeSale;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
