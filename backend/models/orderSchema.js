const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    billingDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        house: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, default: "N/A" },
      },
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID is required"],
          },
          quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: 1,
          },
        },
      ],
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "delivered", "completed", "cancelled"],
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
);

// Middleware to update `updated_at` on updates
orderSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model("Order", orderSchema);
