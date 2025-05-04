const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/products', productController.getAllProducts);
router.get('/products/:type', productController.getProductByType);
router.post('/products', productController.addProduct);

module.exports = router;
