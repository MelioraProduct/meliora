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
      <div className="py-24 px-4 relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-pink-50 to-sky-200"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-300/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-pink-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,_var(--tw-gradient-stops))] from-sky-200/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="py-24 px-4 relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-pink-50 to-sky-200"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-300/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-pink-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,_var(--tw-gradient-stops))] from-sky-200/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Wholesale Packages
          </h1>
          <div className="text-center text-xl font-medium text-gray-600">
            No packages available at the moment
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-pink-50 to-sky-200"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-200/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-300/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-pink-100/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,_var(--tw-gradient-stops))] from-sky-200/20 via-transparent to-transparent"></div>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
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
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary-600 text-white px-6 py-2 rounded-full font-bold">
                  {pkg.name}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <FaCheck className="text-primary-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors flex items-center">
                    Get Started
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WholeSale;

/* Made by Labeeb Tariq */
/* Dynamic by: Wali M. Ahmad */
