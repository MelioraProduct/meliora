import { useSelector, useDispatch } from "react-redux";
import { selectAllReviews } from "../redux/reducers/reviews";
import { fetchReviews } from "../redux/reducers/reviews";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      <div className="py-16 px-4 bg-black text-white">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-16 px-4 bg-black text-white">
        <h1 className="text-4xl font-bold text-center mb-12">Testimonials</h1>
        <div className="text-center text-2xl font-medium text-gray-400">
          No reviews found
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-black text-white">
      <h1 className="text-4xl font-bold text-center mb-12">Testimonials</h1>
      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center">
          <p className="text-xl md:text-2xl mb-4">
            "{reviews[currentIndex].review}"
          </p>
          <p className="text-lg font-medium">
            - {reviews[currentIndex].customerName}
          </p>
        </motion.div>
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
