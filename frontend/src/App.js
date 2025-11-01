import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import ProfileComponent from "./pages/Profile";
import SignIn from "./pages/LogIn/SignIn";
import SignUp from "./pages/LogIn/SignUp";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Portfolio from "./pages/Portfolio/Portfolio";
import AdminSignIn from "./dashboard/pages/Login/AdminSignIn";
import Admin from "./dashboard/pages/Admin";
import Dashboard from "./dashboard/pages/Dashboard";
import Order from "./dashboard/pages/Order";
import AddProducts from "./dashboard/pages/Product";
import Blog from "./dashboard/pages/Blog";
import Account from "./dashboard/pages/Account";
import Packages from "./dashboard/pages/Packages";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/reducers/products";
import { fetchReviews } from "./redux/reducers/reviews";
import { fetchBlogs } from "./redux/reducers/blogs";
import axios from "axios";

// Axios configuration
axios.defaults.baseURL = process.env.REACT_APP_API_ORIGIN;
axios.defaults.headers.post["Content-Type"] = "application/json";

const router = createBrowserRouter([
  // User routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetails />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-details",
    element: <OrderDetails />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileComponent />
      </ProtectedRoute>
    ),
  },
  // Admin routes
  {
    path: "/admin",
    element: <AdminSignIn />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Dashboard />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Order />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/packages",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Packages />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <AddProducts />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/blogs",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Blog />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/account",
    element: (
      <AdminProtectedRoute>
        <Admin />
        <Account />
      </AdminProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews());
    dispatch(fetchBlogs());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
