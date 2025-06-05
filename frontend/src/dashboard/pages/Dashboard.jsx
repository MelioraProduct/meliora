import React, { useState, useEffect } from "react";
import axios from "axios";
import LineGraph from "../components/graphs/LineGraph";
import BarGraph from "../components/graphs/BarGraph";
import styles from "./style.module.css";

export default function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topSellingProduct, setTopSellingProduct] = useState({
    name: "",
    percentage: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total orders
        const ordersResponse = await axios.get("/order");
        setTotalOrders(ordersResponse.data.length);

        // Fetch total products
        const productsResponse = await axios.get("/products");
        setTotalProducts(productsResponse.data.length);

        // Fetch total revenue
        const revenueResponse = await axios.get("/order/revenue");
        setTotalRevenue(revenueResponse.data.revenue);

        // Fetch top-selling product
        const topProductResponse = await axios.get("/order/top-selling");
        const topProduct = topProductResponse.data;

        setTopSellingProduct({
          name: topProduct.name,
          percentage: topProduct.percentage,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = (topSellingProduct.percentage / 100) * circleCircumference;

  return (
    <div className={styles.dashboard}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h1>Dashboard</h1>
          <p>Welcome Admin!</p>
        </div>
      </div>
      <div className={styles.maindashboard}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardIconWrapper}>
              <span className={styles.cardIcon} role="img" aria-label="orders">📦</span>
            </div>
            <div className={styles.cardNumber}>{totalOrders}</div>
            <div className={styles.cardLabel}>Total Orders</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIconWrapper}>
              <span className={styles.cardIcon} role="img" aria-label="products">🛒</span>
            </div>
            <div className={styles.cardNumber}>{totalProducts}</div>
            <div className={styles.cardLabel}>Total Products</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIconWrapper}>
              <span className={styles.cardIcon} role="img" aria-label="revenue">💰</span>
            </div>
            <div className={styles.cardNumber}>${totalRevenue ? totalRevenue.toFixed(2) : "0"}</div>
            <div className={styles.cardLabel}>Total Revenue</div>
          </div>
          <div className={styles.lastcard}>
            <div className={styles.first}>
              <div className={styles.topSellingTitle}>Top Selling Product</div>
              <div className={styles.productName}>{topSellingProduct.name}</div>
              <div className={styles.totalOrders}>
                Total Orders: {totalOrders}
              </div>
            </div>
            <div className={styles.progresscontainer}>
              <svg width='120' height='120' className={styles.circularchart}>
                <circle
                  className={styles.circlebackground}
                  cx='60'
                  cy='60'
                  r='45'
                  strokeWidth='10'
                  fill='none'
                />
                <circle
                  className={styles.circleprogress}
                  cx='60'
                  cy='60'
                  r='45'
                  strokeWidth='10'
                  fill='none'
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={circleCircumference - progress}
                />
                <text
                  x='50%'
                  y='50%'
                  textAnchor='middle'
                  dy='.3em'
                  className={styles.progresstext}>
                  {topSellingProduct.percentage}%
                </text>
              </svg>
              <div className={styles.label}>Total Order</div>
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.cardone}>
            <div>
              <LineGraph />
            </div>
          </div>
          <div className={styles.cardtwo}>
            <div>
              <BarGraph name={topSellingProduct.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
