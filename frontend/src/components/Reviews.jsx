import { InfiniteMovingCards } from "./../ui/infinite-moving-cards.tsx";
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
        <InfiniteMovingCards
          items={reviews.map((review) => ({
            name: review.customerName,
            quote: review.review,
          }))}
          direction='right'
          speed='slow'
        />
      ) : (
        <div className='text-center text-2xl font-medium text-gray-500 col-span-full'>
          No reviews found
        </div>
      )}
    </div>
  );
}
