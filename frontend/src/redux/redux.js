import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import productsReducer from "./reducers/products";
import reviewsReducer from "./reducers/reviews";
import blogsReducer from "./reducers/blogs";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    reviews: reviewsReducer,
    blogs: blogsReducer,
  },
});
