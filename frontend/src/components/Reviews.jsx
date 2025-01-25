import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./../ui/infinite-moving-cards.tsx";
import axios from "axios";

export function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsResponse = await axios.get("/review");

        if (reviewsResponse.data && reviewsResponse.data.length > 0) {
          const complete = await Promise.all(
            reviewsResponse.data.map(async (review) => {
              if (review.customerId && review.productId) {
                const customerResponse = await axios.get(
                  `/customers/${review.customerId}`
                );
                const customerName = customerResponse.data.name;
                const productResponse = await axios.get(
                  `/products/${review.productId}`
                );
                const productName = productResponse.data.name;
                return {
                  ...review,
                  customerName,
                  productName,
                };
              }
              return null;
            })
          );

          const validReviews = complete.filter((review) => review !== null);
          setReviews(validReviews);
        } else {
          console.log("No reviews found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='h-[40rem] rounded-md flex flex-col gap-10 antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
      <h1 className='text-4xl font-bold dark:text-white'>Testimonials</h1>
      {reviews.length > 0 ? (
        <InfiniteMovingCards
          items={reviews.map((review) => ({
            name: review.customerName,
            quote: review.review,
            title: review.productName,
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
