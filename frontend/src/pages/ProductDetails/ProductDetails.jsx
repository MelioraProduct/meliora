import React, { useEffect, useState } from "react";
import { Button } from "@mui/joy";
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.maincontainer}>
        <span className={styles.whatsapplogo}>
          <WhatsAppLink product={product.name} />
        </span>
        <div className={styles.leftsection}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.productImgSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            <img
              className={styles.productImg}
              src={currentImageIndex === 0 ? product.frontImage : product.backImage}
              alt={product.name}
            />
          </motion.div>
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
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.subDetail}>
            <p>{product.subDetail}</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.rightsection}>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {product.name}
          </h1>
          <h1 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">
            {getPriceForSize(product.sizes)}
          </h1>
          <h5 className="text-sm text-gray-500 mb-6">Total Price - Calculated at checkout</h5>
          <div className={styles.para}>
            <p className="text-gray-700">{product.detail}</p>
          </div>
          
          <div className="space-y-4 mt-8">
            <div>
              <h5 className="text-lg font-semibold mb-3">Size:</h5>
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
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3">Quantity:</h5>
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
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3">Stock:</h5>
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
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-3">Price:</h5>
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
            </div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={styles.deliveryDetails}>
            <div className={styles.delivery}>
              <div className={styles.logo}>
                <FiTruck className="text-blue-600 text-2xl" />
              </div>
              <div className={styles.text}>
                <h3 className="text-lg font-semibold">Speedy Shipping!</h3>
                <p className="text-gray-600">
                  Your order will zoom to your doorstep in just 2-4 days. No
                  waiting around!
                </p>
              </div>
            </div>
            <div className={styles.delivery}>
              <div className={styles.logo}>
                <LiaSyncAltSolid className="text-blue-600 text-2xl" />
              </div>
              <div className={styles.text}>
                <h3 className="text-lg font-semibold">Hassle-Free Returns!</h3>
                <p className="text-gray-600">
                  Enjoy free returns for 30 days. Your happiness, guaranteed!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={styles.cartoptions}>
            <div className={styles.items}>
              <button 
                onClick={() => limit !== 1 && setLimit(limit - 1)}
                className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition-colors">
                -
              </button>
              <span className="px-4 py-2 bg-gray-100">{limit}</span>
              <button 
                onClick={() => setLimit(limit + 1)}
                className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors">
                +
              </button>
            </div>
            <Button 
              onClick={handleAddToCart}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Add to Cart
            </Button>
            <Button 
              onClick={handleShowCart}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
              See Cart
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={styles.descriptionSection}>
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
      </motion.div>
      <ReviewSection product={product} />
      <ToastContainer />
    </>
  );
}

// Made by: Zain Manzoor github: ZainManzoor2003
/* Dynamic by: Wali M. Github: WaliMuhammadAhmad */
