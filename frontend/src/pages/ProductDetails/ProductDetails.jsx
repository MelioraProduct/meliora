import { Button } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { Navbar } from "../../components/Navbar";
import Cart from "../../components/Cart";
import CreateContextApi from "../../hooks/CreateContextApi";
import ReviewSection from "../../components/ReviewSection";
import styles from "./style.module.css";
import { Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatsAppLink from "../../components/WhatsAppLink";

export default function ProductDetails() {
  const unit = "Rs.";
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [limit, setLimit] = useState(1);
  const { showCart, setShowCart, cartData, setCartData, sizeIndex, setSizeIndex } =
    useContext(CreateContextApi);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

  const handleSizeClick = (index) => {
    setSelectedSizeIndex(index);
    setSizeIndex(index)
  };

  // handle images carousel timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // cart
  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    if (cartCookie) {
      setCartData(JSON.parse(cartCookie));
    }
  }, []);

  const handleAddToCart = () => {
    const existingProductIndex = cartData.findIndex(
      (item) => item.id === product.id
    );
    let updatedCart;
    if (existingProductIndex !== -1) {
      // Product already exists, update the quantity
      updatedCart = cartData.map((item, index) =>
        index === existingProductIndex
          ? { ...item, items: item.items + limit } // Update quantity
          : item
      );
    } else {
      // Product doesn't exist, add it to the cart
      updatedCart = [
        ...cartData,
        { ...product, items: limit }, // Add new product with the selected limit
      ];
    }
    setCartData(updatedCart); // Update state
    Cookies.set("cart", JSON.stringify(updatedCart), {
      expires: 1, // 1-day expiry
    });
    toast.success(`Cart Item Updated to ${limit}`, {
      autoClose: 1000,
      position: "top-center",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${productId}`);
        if (response.data) {
          setProduct(response.data);
        } else {
          return (
            <Container className='flex flex-col items-center justify-center h-screen'>
              <Typography variant='h4' className='mb-4'>
                Please go back and try again.
              </Typography>
              <Typography variant='body1' className='mb-8 text-gray-600'>
                Selected Product doenst exist in the database.
              </Typography>
              <div className='flex space-x-4'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => navigate("/")}>
                  Go to Home
                </Button>
              </div>
            </Container>
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product) {
    return (
      <div className='h-screen w-full flex justify-center content-center'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
      <div className={styles.maincontainer}>
        <span className={styles.whatsapplogo}>
          <WhatsAppLink product={product.name} />
        </span>
        <div className={styles.leftsection}>
          <div
            className={styles.productImgSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            <img
              className={styles.productImg}
              src={
                currentImageIndex === 0 ? product.frontImage : product.backImage
              }
              alt={product.name}
            />
          </div>
          <div className={styles.carouselDots}>
            {[0, 1].map((index) => (
              <span
                key={index}
                className={`${styles.dot} ${currentImageIndex === index ? styles.activeDot : ""
                  }`}
                onClick={() => handleDotClick(index)}></span>
            ))}
          </div>
          <div className={styles.subDetail}>
            <p>{product.subDetail}</p>
          </div>
        </div>
        <div className={styles.rightsection}>
          <h1 style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {product.name}
          </h1>
          <h1>
            {unit}
            {product.sizes.find((size) => size.size === "Small")?.price}
          </h1>
          <h5 className={styles.price}>Total Price - Calculated at checkout</h5>
          <div className={styles.para}>
            <p>{product.detail}</p>
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Size:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.sizeButton} ${selectedSizeIndex === index ? styles.selected : ""
                  }`}
                onClick={() => handleSizeClick(index)}
                onMouseEnter={() => handleSizeClick(index)}
                onMouseLeave={() => setSelectedSizeIndex(null)}>
                {size.size}
              </button>
            ))}
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Quantity:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.quantityButton} ${selectedSizeIndex === index ? styles.selected : ""
                  }`}>
                {size.quantity}
              </button>
            ))}
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Stock:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.quantityButton} ${selectedSizeIndex === index ? styles.selected : ""
                  }`}>
                {size.stockQuantity}
              </button>
            ))}
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Price:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.quantityButton} ${selectedSizeIndex === index ? styles.selected : ""
                  }`}>
                {unit}
                {size.price}
              </button>
            ))}
          </div>
          <div className={styles.deliveryDetails}>
            <div className={styles.delivery}>
              <div className={styles.logo}>
                <FiTruck />
              </div>
              <div className={styles.text}>
                <h3>Speedy Shipping!</h3>
                <p>
                  Your order will zoom to your doorstep in just 2-4 days. No
                  waiting around!
                </p>
              </div>
            </div>
            <div className={styles.delivery}>
              <div className={styles.logo}>
                <LiaSyncAltSolid />
              </div>
              <div className={styles.text}>
                <h3>Hassle-Free Returns!</h3>
                <p>
                  Enjoy free returns for 30 days. Your happiness, guaranteed!
                </p>
              </div>
            </div>
          </div>
          <div className={styles.cartoptions}>
            <div className={styles.items}>
              <button onClick={() => limit !== 1 && setLimit(limit - 1)}>
                -
              </button>
              {limit}
              <button onClick={() => setLimit(limit + 1)}>+</button>
            </div>
            <Button
              onClick={() => {
                handleAddToCart();
              }}>
              Add to Cart
            </Button>
          </div>
          <Button
            onClick={() => {
              setShowCart(!showCart);
            }}>
            See Cart
          </Button>
        </div>
      </div>
      <div className={styles.descriptionSection}>
        <h1 className={styles.heading}>Product Description</h1>
        <div className={styles.descriptionTextContainer}>
          <div className={styles.descriptionText}>
            <p>{product.subDetail}</p>
            <p>{product.description}</p>
            <br />
            <p>{product.safetyInformation}</p>
          </div>
          <img
            className={styles.descriptionImage}
            src={product.frontImage}
            alt={product.name}
          />
        </div>
      </div>
      <ReviewSection product={product} />
      <ToastContainer />
    </>
  );
}

// Made by: Zain Manzoor github: ZainManzoor2003
/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */
