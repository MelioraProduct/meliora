import { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/reducers/cart";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../redux/reducers/order";
import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.css";
import axios from "axios";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.cart.currency);
  const carts = useSelector((store) => store.cart.items);
  const total = carts.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post("/order", orderData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Order placed successfully", {
        autoClose: 1000,
        position: "top-center",
      });
      console.log(response.data);
      dispatch(addOrder(response.data));
      dispatch(clearCart());
      setTimeout(() => navigate("/order-details"), 1200);
    } catch (error) {
      toast.error("Error placing order", {
        autoClose: 2000,
        position: "top-center",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      billingDetails: {
        name: formData.firstName,
        email: formData.email,
        phone: formData.phoneNumber,
        address: {
          house: formData.apartment || "N/A",
          street: formData.streetAddress || "N/A",
          city: formData.city || "N/A",
          state: formData.state || "N/A",
          postalCode: formData.postalCode || "N/A",
          country: formData.country || "N/A",
        },
      },
      cart: {
        items: carts.map((data) => ({
          productId: data.productId,
          quantity: data.quantity,
        })),
      },
      paymentMethod: "Cash on Delivery",
      totalAmount: total,
      status: "pending",
    };
    placeOrder(orderData);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.checkoutContainer}>
        <div className={styles.billing}>
          <Typography variant='h3'>Billing Details</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name='firstName'
              label='First Name'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <TextField
              name='streetAddress'
              label='Street Address'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <TextField
              name='apartment'
              label='House, Apartment, Floor, etc'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <TextField
              name='city'
              label='Town City'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <div className='flex gap-2'>
              <TextField
                name='state'
                label='State'
                variant='standard'
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 1 }}
              />
              <TextField
                name='postalCode'
                label='Postal Code'
                variant='standard'
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 1 }}
              />
            </div>
            <TextField
              name='country'
              label='Country'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <TextField
              name='phoneNumber'
              label='Phone Number'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <TextField
              name='email'
              type='email'
              label='Email'
              variant='standard'
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 1 }}
            />
            <Typography variant='overline' sx={{ display: "block", my: 1 }}>
              For now we only support Cash on Delivery
            </Typography>
            <Button type='submit' variant='outlined'>
              Place Order
            </Button>
          </form>
        </div>

        <div className={styles.checkoutItems}>
          <Typography variant='h3'>Item Details</Typography>
          {carts.length === 0 ? (
            <Typography variant='h5' sx={{ mt: 2 }}>
              No items in the cart
            </Typography>
          ) : (
            <div className={styles.cartItems}>
              {carts.map((item, index) => (
                <div className={styles.item} key={index}>
                  <img
                    className={styles.productImage}
                    src={item.productImage}
                    alt={item.productName}
                  />
                  <div>
                    <Typography variant='h5'>{item.productName}</Typography>
                    <Typography variant='subtitle1'>
                      Size: {item.productSize}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {currency}
                      {item.productPrice} x {item.quantity}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={styles.label}>
            <Typography variant='h6'>SubTotal:</Typography>
            <Typography variant='h6'>
              {currency}
              {total}
            </Typography>
          </div>
          <div className={styles.label}>
            <Typography variant='h6'>Shipping:</Typography>
            <Typography variant='h6'>Free</Typography>
          </div>
          <div className={styles.label}>
            <Typography variant='h6'>Total:</Typography>
            <Typography variant='h6'>
              {currency}
              {total}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
