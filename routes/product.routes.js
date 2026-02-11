const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const verifyToken = require("../middleware");

router.get("/get-all-products", productController.getAllProducts);

module.exports = router;
