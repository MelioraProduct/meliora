import { useSelector, useDispatch } from "react-redux";
import { selectAllReviews } from "../redux/reducers/reviews";
import { fetchReviews } from "../redux/reducers/reviews";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews) || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Testimonials
        </h1>
        <div className="text-center text-xl font-medium text-gray-400">
          No reviews found
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Testimonials
      </h1>
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl">
          <FaQuoteLeft className="text-blue-400 text-4xl mb-6 opacity-20" />
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            "{reviews[currentIndex].review}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-white">
                - {reviews[currentIndex].customerName}
              </p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${
                      i < reviews[currentIndex].stars ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-blue-500 scale-125"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
