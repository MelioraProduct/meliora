const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    subDetail: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    category: {
      type: String,
      required: true,
      enum: ["Detergents", "Cleaners", "Disinfectants", "Bleaches", "Other"],
    },
    isEcoFriendly: {
      type: Boolean,
      default: false,
    },
    safetyInformation: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    sizes: [
      {
        size: {
          type: String,
          required: true,
          enum: ["Small", "Medium", "Large", "XL", "Other"],
        },
        quantity: {
          type: String,
          required: true,
        },
        stockQuantity: {
          type: Number,
          required: true,
          min: 0,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
          default: 1,
        },
      },
    ],
    frontImage: {
      type: String,
      required: true,
      trim: true,
    },
    backImage: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
