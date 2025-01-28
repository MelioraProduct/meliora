import React, { useContext, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import CreateContextApi from "../hooks/CreateContextApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { WindowSharp } from "@mui/icons-material";

export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const { showCart, setShowCart, cartData, setCartData, total, setTotal, sizeIndex, setSizeIndex } =
    useContext(CreateContextApi);
  const navigate = useNavigate();

  useEffect(() => {
    if (showCart) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showCart]);

  console.log("cartData", cartData);

  return (
    <>
      <motion.div
        className={styles.cartcontainer}
        initial={{ x: "100vw" }}
        animate={{ x: showCart ? 0 : "100vw" }}
        transition={{ duration: 1, ease: "easeInOut" }}>
        <div
          className={styles.leftsection}
          style={{ backgroundColor: bgColor }}></div>
        <div className={styles.rightsection}>
          <div className={styles.crossicon}>
            <RxCross1 onClick={() => setShowCart(!showCart)} />
          </div>
          <div className={styles.topheading}>
            <h1>CART</h1>
          </div>
          <div className={styles.cartitems}>
            {cartData.map((data, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.imagesection}>
                  <img src={data.frontImage} alt='' />
                </div>
                <div className={styles.itemright}>
                  <h5>{data.name}</h5>
                  <h5>
                    ${sizeIndex && data.sizes[sizeIndex].price} x {data.items}
                  </h5>
                </div>
              ))}
              <hr />
            </div>
            <div className={styles.label}>
              <h3>SubTotal:</h3>
              <h3>{total}</h3>
            </div>
            <div className={styles.label}>
              <h3>Shipping:</h3>
              <h3>Free</h3>
            </div>
            <div className={styles.label}>
              <h3>Total:</h3>
              <h3>{total}</h3>
            </div>
            <div className={styles.checkout}>
              <button
                className='text-white text-lg border-white mt-2'
                onClick={() => {
                  navigate("/checkout");
                  setShowCart(!showCart);
                  document.body.classList.remove("no-scroll");
                }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
