import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  items: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
  currency: "Rs.",
  status: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const {
        productId,
        quantity,
        productName,
        productImage,
        productSize,
        productPrice,
      } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === productId && item.productSize === productSize
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({
          productId,
          productName,
          productImage,
          productSize,
          productPrice,
          quantity,
        });
      }

      Cookies.set("cart", JSON.stringify(state.items), { expires: 1 });
    },
    changeQuantity(state, action) {
      const { productId, quantity, productSize } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === productId && item.productSize === productSize
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity = quantity;
      }

      state.items = state.items.filter((item) => item.quantity > 0);

      Cookies.set("cart", JSON.stringify(state.items), { expires: 1 });
    },
    toggleStatus(state) {
      if (state.statusTab === false) {
        state.statusTab = true;
      } else {
        state.statusTab = false;
      }
    },
    clearCart(state) {
      state.items = [];
      Cookies.remove("cart");
    },
  },
});

export const { addToCart, changeQuantity, clearCart, toggleStatus } =
  cartSlice.actions;
export default cartSlice.reducer;
