import React, { useEffect, useState } from "react";
import { Button } from "@mui/joy";
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleStatus } from "../../redux/reducers/cart";
import { selectAllProducts } from "../../redux/reducers/products";
import { getPriceForSize } from "../../utils/getPriceForSize";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../components/Navbar";
import Cart from "../../components/Cart";
import WhatsAppLink from "../../components/WhatsAppLink";
import ReviewSection from "../../components/ReviewSection";
import styles from "./style.module.css";

export default function ProductDetails() {
  const currency = "Rs.";
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const product = products.find((p) => p._id === productId);

  const [limit, setLimit] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const showCart = useSelector((state) => state.cart.statusTab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShowCart = () => {
    dispatch(toggleStatus());
  };

  const handleSizeClick = (index) => {
    setSelectedSizeIndex(index);
  };

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

  const handleAddToCart = () => {
    if (selectedSizeIndex === null) {
      toast.error("Please select a size before adding to cart.", {
        autoClose: 2000,
        position: "top-center",
      });
      return;
    }

    const selectedSize = product.sizes[selectedSizeIndex];

    dispatch(
      addToCart({
        productId: product._id,
        productName: product.name,
        productImage: product.frontImage,
        productSize: selectedSize.size,
        productPrice: selectedSize.price,
        quantity: limit,
      })
    );

    toast.success(`Cart updated: ${limit} item(s) added`, {
      autoClose: 1000,
      position: "top-center",
    });
  };

  if (!product) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
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
                className={`${styles.dot} ${
                  currentImageIndex === index ? styles.activeDot : ""
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
          <h1>{getPriceForSize(product.sizes)}</h1>
          <h5 className={styles.price}>Total Price - Calculated at checkout</h5>
          <div className={styles.para}>
            <p>{product.detail}</p>
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Size:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.sizeButton} ${
                  selectedSizeIndex === index ? styles.selected : ""
                }`}
                onClick={() => handleSizeClick(index)}>
                {size.size}
              </button>
            ))}
          </div>
          <h5 style={{ fontWeight: "500", marginTop: "10px" }}>Quantity:</h5>
          <div className={styles.buttons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.quantityButton} ${
                  selectedSizeIndex === index ? styles.selected : ""
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
                className={`${styles.quantityButton} ${
                  selectedSizeIndex === index ? styles.selected : ""
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
                className={`${styles.quantityButton} ${
                  selectedSizeIndex === index ? styles.selected : ""
                }`}>
                {currency}
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
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
          <Button onClick={() => handleShowCart()}>See Cart</Button>
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
