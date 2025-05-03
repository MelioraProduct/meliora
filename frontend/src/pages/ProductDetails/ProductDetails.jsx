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

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    if (selectedSizeIndex === null) {
      toast.error("Please select a size");
      return;
    }

    const selectedSize = product.sizes[selectedSizeIndex];
    const price = getPriceForSize(product, selectedSize);

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        size: selectedSize,
        price,
        quantity: limit,
        image: product.frontImage,
      })
    );

    toast.success("Added to cart!");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
      <div className={styles.maincontainer}>
        <div className={styles.leftsection}>
          <div
            className={styles.productImgSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            <img
              className={styles.productImg}
              src={currentImageIndex === 0 ? product.frontImage : product.backImage}
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
        </div>

        <div className={styles.rightsection}>
          <h1>{product.name}</h1>
          <div className={styles.price}>
            {selectedSizeIndex !== null
              ? `${currency} ${getPriceForSize(
                  product,
                  product.sizes[selectedSizeIndex]
                )}`
              : "Select a size"}
          </div>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.sizeButtons}>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`${styles.sizeButton} ${
                  selectedSizeIndex === index ? styles.selected : ""
                }`}
                onClick={() => handleSizeClick(index)}>
                {size}
              </button>
            ))}
          </div>

          <div className={styles.quantityControls}>
            <button
              className={styles.quantityButton}
              onClick={() => setLimit((prev) => Math.max(1, prev - 1))}>
              -
            </button>
            <span className={styles.quantityDisplay}>{limit}</span>
            <button
              className={styles.quantityButton}
              onClick={() => setLimit((prev) => prev + 1)}>
              +
            </button>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <WhatsAppLink product={product.name} className={styles.whatsappButton} />
          </div>

          <div className={styles.deliveryDetails}>
            <div className={styles.deliveryItem}>
              <FiTruck className={styles.deliveryIcon} />
              <div className={styles.deliveryText}>
                <h3>Free Delivery</h3>
                <p>On orders above Rs. 2000</p>
              </div>
            </div>
            <div className={styles.deliveryItem}>
              <LiaSyncAltSolid className={styles.deliveryIcon} />
              <div className={styles.deliveryText}>
                <h3>Easy Returns</h3>
                <p>7 days return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewSection productId={productId} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

// Made by: Zain Manzoor github: ZainManzoor2003
/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */
