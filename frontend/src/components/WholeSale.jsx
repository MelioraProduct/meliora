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
      <div className="py-24 px-4 bg-gradient-to-br from-pink-50 via-sky-50 to-blue-50">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="py-24 px-4 bg-gradient-to-br from-pink-50 via-sky-50 to-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
          Wholesale Packages
        </h1>
        <div className="text-center text-xl font-medium text-slate-600">
          No packages available at the moment
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 bg-gradient-to-br from-pink-50 via-sky-50 to-blue-50">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
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
            className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-pink-200/50 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold">
                {pkg.name}
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="text-4xl font-bold mb-4 text-slate-800">
                ${pkg.price}
                <span className="text-lg text-slate-500">/month</span>
              </div>
              <p className="text-slate-600 mb-8">{pkg.description}</p>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <FaCheck className="text-pink-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 transition-all">
                Get Started
              </button>
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
