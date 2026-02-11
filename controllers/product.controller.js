var db = require("../models");
const Product = db.Product;

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
};
