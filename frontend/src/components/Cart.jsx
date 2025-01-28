import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatus } from "../redux/reducers/cart";
import styles from "./cart.module.css";

export default function Cart() {
  const unit = "Rs.";
  const navigate = useNavigate();
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(true);

  const handleShowCart = () => {
    setIsCartOpen(false);
    dispatch(toggleStatus());
  };

  const calculateTotal = () => {
    return carts.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
  };

  const total = calculateTotal();

  return (
    <motion.div
      className={styles.cartcontainer}
      initial={{ x: "100%" }}
      animate={{ x: isCartOpen ? 0 : "100%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}>
      <div className={styles.rightsection}>
        <div className={styles.crossicon}>
          <RxCross1 onClick={handleShowCart} />
        </div>
        <div className={styles.topheading}>
          <h1>CART</h1>
        </div>
        <div className={styles.cartitems}>
          {carts.map((data, index) => (
            <div key={index} className={styles.item}>
              <img
                className={styles.productImage}
                src={data.productImage}
                alt='Product'
              />
              <div className={styles.itemright}>
                <h5>{data.productName}</h5>
                <p>
                  <strong>Size:</strong>
                  <span>{data.productSize}</span>
                </p>
                <p>
                  <strong>Price:</strong>
                  <span>
                    {unit}
                    {data.productPrice}
                  </span>
                </p>
                <p>
                  <strong>Quantity:</strong>
                  <span>{data.quantity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.label}>
          <h3>Total:</h3>
          <h3>
            {unit}
            {total}
          </h3>
        </div>
        <div className={styles.checkout}>
          <button
            className='text-white text-lg border-white mt-2'
            onClick={() => {
              navigate("/checkout");
              document.body.classList.remove("no-scroll");
            }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
