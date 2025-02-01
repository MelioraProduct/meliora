import React from "react";
import styles from "./style.module.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const orders = useSelector((state) => state.order.orders);
  const latestOrder = orders[orders.length - 1];
  console.log(latestOrder);
  const navigate = useNavigate();
  return (
    <div className={styles.orderContainer}>
      <h1>Order Details</h1>
      {latestOrder ? (
        <div className={styles.orderDetailsContainer}>
          <p>Order ID: {latestOrder.order._id.substring(0, 10)}</p>
          <div className={styles.orderDetails}>
            <div className={styles.details}>
              <h2 style={{ textAlign: "center" }}>Billing Details</h2>
              <p>Name: {latestOrder.order.billingDetails.name}</p>
              <p>Email: {latestOrder.order.billingDetails.email}</p>
              <p>Phone: {latestOrder.order.billingDetails.phone}</p>
              <div>
                <p>Address:</p>
                <p>House: {latestOrder.order.billingDetails.address.house}</p>
                <p>City: {latestOrder.order.billingDetails.address.city}</p>
                <p>
                  Postal Code:{" "}
                  {latestOrder.order.billingDetails.address.postalCode}
                </p>
                <p>
                  Country: {latestOrder.order.billingDetails.address.country}
                </p>
              </div>
            </div>
            <div className={styles.details}>
              <h2 style={{ textAlign: "center" }}>Order Summary</h2>
              <p>Order Started At: {latestOrder.order.created_at}</p>
              <p>Status : {latestOrder.order.status}</p>
              <p>Payment Method : {latestOrder.order.paymentMethod}</p>
              <p>Total Items: {latestOrder.order.cart.items.length}</p>
              <p>Total Price: {latestOrder.order.totalAmount}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No order found.</p>
      )}
      <div className={styles.buttonContainer}>
        <Button variant='contained' onClick={() => navigate("/")}>
          Home
        </Button>
        <Button variant='contained' onClick={() => navigate("/profile")}>
          Panel
        </Button>
      </div>
    </div>
  );
}
