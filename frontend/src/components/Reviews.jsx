import { useSelector, useDispatch } from "react-redux";
import { selectAllReviews } from "../redux/reducers/reviews";
import { fetchReviews } from "../redux/reducers/reviews";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaQuoteLeft } from "react-icons/fa";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchReviews());
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, [dispatch]);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  if (isLoading) {
    return (
      <div className="py-24 px-4" style={{
        background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
      }}>
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-24 px-4" style={{
        background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
          Customer Reviews
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
            <FaQuoteLeft className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Reviews Yet</h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            Be the first to share your experience with our products and services.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4" style={{
      background: 'linear-gradient(123deg, rgba(245, 218, 224, 1) 13%, rgba(148, 187, 233, 1) 100%)'
    }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-200 font-sans tracking-tight drop-shadow-sm">
        Customer Reviews
      </motion.h1>
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
          <div className="absolute -top-4 left-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center">
              <FaQuoteLeft className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl mb-6 text-gray-800">
              "{reviews[currentIndex].review}"
            </p>
            <p className="text-lg font-bold text-gray-700">
              - {reviews[currentIndex].customerName}
            </p>
          </div>
        </motion.div>
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-blue-500 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
