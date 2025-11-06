// import Product from "../models/Product.js";

// // ➕ Add Product
// export const addProduct = async (req, res) => {
//   try {
//     const { name, description, category, price, images, stock } = req.body;

//     const newProduct = new Product({
//       name,
//       description,
//       category,
//       price,
//       images,
//       stock,
//     });

//     await newProduct.save();
//     res
//       .status(201)
//       .json({ message: "Product added successfully", product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding product", error });
//   }
// };

// // 📦 Get All Products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// };

// // 🔍 Get Single Product
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };

// // ❌ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// };

// import Product from "../models/Product.js";

// // ✅ Add Product (already working)
// export const addProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json({ message: "Product added successfully", product });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding product", error });
//   }
// };

// // ✅ Get All Products
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// };

// // ✅ Get Single Product by ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };

// // ✅ Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json({ message: "Product updated successfully", product });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// };

// // ✅ Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// };

import Product from "../models/Product.js";
import cloudinary from "./../config/cloudinary.js";

// ===============================
// 📦 Add Product (with image upload)
// ===============================
export const addProduct = async (req, res) => {
  try {
    console.log("🟢 Received product data:", req.body);
    console.log("🟢 Received files:", req.files);

    const { name, description, category, price, stock } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        console.log("🟣 Uploading file:", file.path);
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
        console.log("✅ Uploaded to Cloudinary:", result.secure_url);
      }
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images,
    });

    res.status(201).json({
      message: "✅ Product added successfully",
      product,
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error });
  }
};

// ===============================
// 📋 Get All Products
// ===============================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
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
