import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import productsReducer from './reducers/products';
import reviewsReducer from './reducers/reviews';
import blogsReducer from './reducers/blogs';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    reviews: reviewsReducer,
    blogs: blogsReducer,
  },
}); 