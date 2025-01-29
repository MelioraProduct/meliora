import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    try {
      const response = await axios.get(`/review`);
      const reviews = response.data;

      const reviewsWithCustomers = await Promise.all(
        reviews.map(async (review) => {
          if (review.customerId) {
            try {
              const customerResponse = await axios.get(
                `/customers/${review.customerId}`
              );
              const customerData = customerResponse.data;

              return {
                _id: review._id,
                productId: review.productId,
                stars: review.stars || 0,
                review: review.review,
                createdAt: review.createdAt || "Not specified",
                customerName: customerData.name || null,
                location: {
                  city: customerData.address?.city || "Unknown",
                  country: customerData.address?.country || "Unknown",
                },
              };
            } catch (error) {
              console.error("Error fetching customer:", error);
              return {
                _id: review._id,
                productId: review.productId,
                stars: review.stars || 0,
                review: review.review,
                createdAt: review.createdAt || "Not specified",
                customerName: "Anonymous",
                location: { city: "Unknown", country: "Unknown" },
              };
            }
          } else {
            return {
              _id: review._id,
              productId: review.productId,
              stars: review.stars || 0,
              review: review.review,
              createdAt: review.createdAt || "Not specified",
              customerName: "Anonymous",
              location: { city: "Unknown", country: "Unknown" },
            };
          }
        })
      );

      return reviewsWithCustomers;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
export const selectAllReviews = (state) => state.reviews.reviews;
export const selectReviewsByProductId = (state, productId) =>
  state.reviews.reviews.filter((review) => review.productId === productId);
