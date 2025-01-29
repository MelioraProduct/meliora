import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import { getPriceForSize } from "../utils/getPriceForSize";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card
      color='primary'
      invertedColors={false}
      orientation='vertical'
      size='md'
      variant='outlined'
      sx={{
        height: "auto",
      }}>
      <div>
        <Typography sx={{ textTransform: "capitalize" }} level='title-lg'>
          {product.name}
        </Typography>
      </div>
      <img
        src={product.frontImage}
        srcSet={product.frontImage}
        loading='lazy'
        alt={product.name}
        style={{
          width: 300,
          height: 300,
          objectFit: "cover",
        }}
      />
      <CardContent orientation='horizontal'>
        <div>
          <Typography level='body-md'>Total price:</Typography>
          <Typography fontSize='lg' fontWeight='lg'>
            {getPriceForSize(product.sizes)}
          </Typography>
        </div>
        <Button
          onClick={() => navigate("/product-details/" + product._id)}
          variant='solid'
          size='md'
          color='primary'
          aria-label={`Explore ${product.name}`}
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}>
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}

/* 
Made by: Labeeb Tariq
Updated by: Wali M.
*/
