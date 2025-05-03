import { useSelector, useDispatch } from "react-redux";
import { selectAllReviews } from "../redux/reducers/reviews";
import { fetchReviews } from "../redux/reducers/reviews";
import { useEffect } from "react";

export function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(selectAllReviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className='h-[50rem] md:h-[40rem] rounded-md flex flex-col gap-10 antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
      <h1 className='text-4xl font-bold dark:text-white'>Testimonials</h1>
      {reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4">{review.review}</p>
              <p className="font-semibold text-gray-800 dark:text-white">{review.customerName}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center text-2xl font-medium text-gray-500 col-span-full'>
          No reviews found
        </div>
      )}
    </div>
  );
}
