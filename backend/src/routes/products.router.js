const express = require('express');
const productsControllers = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);
router.get('/:id', productsControllers.getProductById);
router.post('/', productsControllers.addProduct);

module.exports = router;