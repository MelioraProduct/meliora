import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import productsReducer from "./reducers/products";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});
