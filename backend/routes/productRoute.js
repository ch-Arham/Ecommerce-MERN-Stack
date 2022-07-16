const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProductDetails } = require('../controllers/productController');

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getSingleProductDetails);

module.exports = router;