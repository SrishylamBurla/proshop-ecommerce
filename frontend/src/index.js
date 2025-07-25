import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import HomeScreen from "./screens/HomeScreen";
import { store } from "./store/store";
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen";
import { Provider } from 'react-redux'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginScreen from "./screens/LoginScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PrivateRoute from "./components/PrivateRoute";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PayPalScriptProvider options={{ "client-id": "Adq_33Qu8vy7p4q18Qq0JOobLZNAT8fjFgU4MPcuUOGXZ_fYamCSw-YhTmPSI4hDgisLzax2nMwEJcz2", 
    currency: 'USD' }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />}/>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>

          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/productlist/:keyword" element={<ProductListScreen />} />
            <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
            <Route path="/admin/productlist/:keyword/:pageNumber" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </PayPalScriptProvider>
  </Provider>
  </React.StrictMode>
);

reportWebVitals();
