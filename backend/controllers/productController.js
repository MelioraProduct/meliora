const Product = require("../models/productSchema");
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      detail,
      subDetail,
      description,
      category,
      isEcoFriendly,
      safetyInformation,
      sizes,
      frontImage,
      backImage,
      descriptionImage,
    } = req.body;

    if (
      !name ||
      !detail ||
      !subDetail ||
      !description ||
      !category ||
      !safetyInformation ||
      !sizes ||
      !frontImage ||
      !backImage
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      detail,
      subDetail,
      description,
      category,
      isEcoFriendly: isEcoFriendly || false,
      safetyInformation,
      sizes,
      frontImage,
      backImage,
      descriptionImage: descriptionImage || null,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      detail,
      subDetail,
      description,
      category,
      isEcoFriendly,
      safetyInformation,
      sizes,
      frontImage,
      backImage,
      descriptionImage,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        detail,
        subDetail,
        description,
        category,
        isEcoFriendly,
        safetyInformation,
        sizes,
        frontImage,
        backImage,
        descriptionImage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
