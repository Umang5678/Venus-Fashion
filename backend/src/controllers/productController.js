import Product from "../models/Product.js";
import cloudinary from "./../config/cloudinary.js";

// ===============================
// 📦 Add Product (with image upload)
// ===============================
export const addProduct = async (req, res) => {
  try {
    let { name, description, category, price, stock, size, discount, occasion } =
      req.body;
    let images = [];

    if (typeof size === "string") {
      try {
        size = JSON.parse(size);
      } catch {
        size = [size];
      }
    }
    if (req.files?.length) {
      console.log("FILES:", req.files);

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
      }
    }

    console.log("IMAGES:", images);
    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      size,
      occasion: JSON.parse(occasion || "[]"), 
      discount, // ✅ new field
      images,
    });

    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      data: product, // ✅ consistent
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Example in Node/Express
export const getProducts = async (req, res) => {
  try {
    const { category, occasion } = req.query;

    const filter = {};

    if (category) filter.category = category;

    if (occasion) filter.occasion = { $in: [occasion] };

    const products = await Product.find(filter);

    res.set("Cache-Control", "no-store");

    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 🔍 Get Product by ID
// ===============================
// controllers/productController.js
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// ===============================
// ✏️ Update Product
// ===============================
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// ===============================
// ❌ Delete Product
// ===============================
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
