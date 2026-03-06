import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Chaniya Choli", "Kurti Pair", "Gown Sets"],
      required: true,
    },
    size: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Cloudinary URLs
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
