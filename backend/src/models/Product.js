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
    occasion: {
  type: [String],
  default: [],
},

    size: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    price: {
      type: Number,
      required: true,
    },

    // ✅ NEW FIELD
    discount: {
      type: Number,
      // percentage
    },

    images: {
      type: [String],
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// ✅ Virtual field for discounted price
productSchema.virtual("finalPrice").get(function () {
  return Math.round(this.price - (this.price * this.discount) / 100);
});

// ✅ allow virtual fields in JSON response
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

// ✅ Add Indexes for speed optimization
productSchema.index({ category: 1 });
productSchema.index({ occasion: 1 });
productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
