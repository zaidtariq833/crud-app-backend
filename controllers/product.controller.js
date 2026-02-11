var db = require("../models");
const Product = db.Product;

const getAllProducts = async (req, res) => {
  const arr = {
    count: 2,
    data: [
      {
        id: 1,
        title: "abc",
        description: "abc",
        price: 10,
        thumbnail: "https://www.google.com",
      },
      {
        id: 1,
        title: "abc",
        description: "abc",
        price: 10,
        thumbnail: "https://www.google.com",
      },
    ],
  };
  try {
    // const products = await Product.findAll();
    console.log("resp");
    res.status(200).json({
      success: true,
      count: arr.count,
      data: arr.data,
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
