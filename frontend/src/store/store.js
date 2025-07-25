import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "../slices/apiSlice";
import authSliceReducer from '../slices/authSlice'
import cartSliceReducer from '../slices/cartSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})
