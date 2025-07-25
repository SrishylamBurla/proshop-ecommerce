import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
                    ? JSON.parse(localStorage.getItem("cart"))
                    : { cartItems: [] , shippingAddress: {}, paymentMethod:'Paypal'};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? item : cartItem
        );
      } else {
        // state.cartItems.push(item)
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) =>{
        state.shippingAddress = action.payload
        return updateCart(state)
    },
    savePaymentMethod: (state, action) =>{
      state.paymentMethod = action.payload
      return updateCart(state)
    },
    clearCartItems: (state, action) =>{
      state.cartItems = []
      return updateCart(state)
    }
  },
});

export default cartSlice.reducer;
export const { addToCart,
              removeItemFromCart,
              saveShippingAddress, 
              savePaymentMethod, clearCartItems } = cartSlice.actions;
