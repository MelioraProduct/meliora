import * as React from "react";
import { memo } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import { getPriceForSize } from "../utils/getPriceForSize";

const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();
  
  return (
    <Card
      variant="outlined"
      sx={{
        height: "auto",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}>
      <div>
        <Typography level="title-lg" sx={{ textTransform: "capitalize" }}>
          {product.name}
        </Typography>
      </div>
      <img
        src={product.frontImage}
        srcSet={`${product.frontImage} 1x, ${product.frontImage} 2x`}
        loading="lazy"
        alt={product.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "contain",
          backgroundColor: "#f8fafc",
          padding: "1rem"
        }}
      />
      <CardContent>
        <div>
          <Typography level="body-md">Total price:</Typography>
          <Typography level="title-lg" fontWeight="lg">
            {getPriceForSize(product.sizes)}
          </Typography>
        </div>
        <Button
          onClick={() => navigate("/product-details/" + product._id)}
          variant="solid"
          color="primary"
          aria-label={`Explore ${product.name}`}
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}>
          Explore
        </Button>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;

/* 
Made by: Labeeb Tariq
Updated by: Wali M.
*/
