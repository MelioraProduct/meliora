import React, { useEffect, useState } from "react";
import styles from "./review.module.css";
import axios from "axios";
import useAuth from "../redux/useAuth";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/joy";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function ReviewSection({ product }) {
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState({});
  const [customer, setCustomer] = useState({});
  const [stars, setStars] = useState(1);
  const [reviv, setReview] = useState("");
  const [hover, setHover] = useState(-1);

  // Handle stars
  const handleStarsChange = (event, newValue) => {
    setStars(newValue);
  };

  const handleHoverChange = (event, newHover) => {
    setHover(newHover);
  };

  const starCounts = [1, 2, 3, 4, 5].reduce((counts, star) => {
    counts[star] = reviews.filter((review) => review.stars === star).length;
    return counts;
  }, {});

  const handleReviewSubmission = () => {
    if (!reviv.trim()) {
      alert("Please provide a review before submitting.");
      return;
    }
    const reviewObject = {
      customerId: customer._id,
      productId: product._id,
      review: reviv.trim(),
      stars: stars,
    };
    try {
      axios.post("/review/", reviewObject).then((response) => {
        if (response.data) {
          setReviews((prevReviews) => [response.data.review, ...prevReviews]);
        } else {
          console.error("Error submitting review:", response);
        }
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setReview("");
    setStars(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewResponse = await axios.get(
          `/review/product/${product._id}`
        );
        if (reviewResponse.data) {
          setReviews(reviewResponse.data);
          for (const review of reviewResponse.data) {
            if (review.customerId !== undefined) {
              const customerResponse = await axios.get(
                `/customers/${review.customerId}`
              );
              setCustomers((prevCustomers) => ({
                ...prevCustomers,
                [review.customerId]: customerResponse.data,
              }));
            } else {
              setCustomers((prevCustomers) => ({
                ...prevCustomers,
                [review.customerId]: {
                  name: "Anonymous",
                  address: { city: "Anonymous", country: "Anonymous" },
                },
              }));
            }
          }
        } else {
          console.error("No reviews found for product with Id:", product._id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        if (isAuthenticated) {
          const customerResponse = await axios.get(
            `/customers/email/${user.email}`
          );
          if (customerResponse.data) {
            setCustomer(customerResponse.data);
          } else {
            console.error("No customer found with Email:", user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchData();
  }, [product._id, isAuthenticated, user]);

  const totalReviews = reviews.length;
  const calculatePercentage = (count) => {
    return totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : 0;
  };

  return (
    <div className={styles.reviewsection}>
      <h1 className={styles.heading}>Customer Reviews</h1>
      <div className={styles.header}>
        <div className={styles.ratingsummary}>
          <Box id={styles.rating}>
            <Rating
              name='read-only'
              value={
                totalReviews > 0
                  ? reviews.reduce((sum, review) => sum + review.stars, 0) /
                    totalReviews
                  : 0
              }
              precision={1}
              readOnly
              emptyIcon={<StarIcon fontSize='inherit' />}
            />
            <Box sx={{ ml: 2 }}>
              {totalReviews > 0
                ? (
                    reviews.reduce((sum, review) => sum + review.stars, 0) /
                    totalReviews
                  ).toFixed(1)
                : 0}{" "}
              out of 5
            </Box>
          </Box>
          <p>Based on {totalReviews} Reviews</p>
        </div>
        <div className={styles.ratingbreakdown}>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className={styles.ratingbar}>
              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${calculatePercentage(starCounts[star])}%`,
                  }}></div>
              </div>
              <span>{starCounts[star]}</span>
            </div>
          ))}
        </div>
        <div className={styles.reviewcontainer}>
          <TextField
            value={reviv}
            onChange={(e) => setReview(e.target.value)}
            id='standard-textarea'
            label='Write your review here...'
            multiline
            variant='standard'
            fullWidth='100%'
            color='primary'
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}>
            <Rating
              name='hover-feedback'
              value={stars}
              precision={1}
              getLabelText={getLabelText}
              onChange={handleStarsChange}
              onChangeActive={handleHoverChange}
              emptyIcon={<StarIcon />}
            />
            {stars !== null && (
              <Box>{labels[hover !== -1 ? hover : stars]}</Box>
            )}
          </Box>
          <Button onClick={handleReviewSubmission}>Post Review</Button>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className={styles.reviewSection}>
          {reviews.map((rev) => (
            <div key={rev._id} className={styles.review}>
              <div className={styles.reviewheader}>
                <div className={styles.topheading}>
                  <h2>
                    <strong>
                      {customers[rev.customerId]?.name || "Anonymous"}
                    </strong>
                  </h2>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name='read-only'
                      value={rev.stars}
                      readOnly
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize='inherit'
                        />
                      }
                    />
                  </Box>
                </div>
              </div>
              <h5 className={styles.reviewContent}>
                {rev.review || "No Review Provided"}
              </h5>
              <div className={styles.reviewFooter}>
                <p>
                  <strong>Location: </strong>
                  {customers[rev.customerId]?.address.city || "Anonymous"},
                  {customers[rev.customerId]?.address.country || "Anonymous"}
                </p>
                <p>
                  <strong>Posted:</strong> {rev.createdAt || "Not specified"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
