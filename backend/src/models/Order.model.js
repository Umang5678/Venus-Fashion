import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal: { type: String, required: true },

    paymentMethod: {
      type: String,
      enum: ["cod", "razorpay"],
      required: true,
    },

    totalAmount: { type: Number, required: true },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        size: String,
      },
    ],

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
