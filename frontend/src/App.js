import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as JoyThemeProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { materialTheme, joyTheme } from "./theme";
import { store } from "./redux/store";
import { router } from "./router";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import ProfileComponent from "./pages/Profile";
import SignIn from "./pages/LogIn/SignIn";
import SignUp from "./pages/LogIn/SignUp";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchReviews());
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={materialTheme}>
        <JoyThemeProvider theme={joyTheme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </JoyThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
