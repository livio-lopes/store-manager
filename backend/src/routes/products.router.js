const express = require('express');
const productsControllers = require('../controllers/products.controller');
const nameProduct = require('../middlewares/nameProduct');

const router = express.Router();

router.get('/', productsControllers.getAllProducts);
router.get('/search', productsControllers.getProductsByName);
router.get('/:id', productsControllers.getProductById);
router.post('/', nameProduct, productsControllers.addProduct);
router.put('/:id', nameProduct, productsControllers.updateProductById);
router.delete('/:id', productsControllers.deleteProductById);

module.exports = router;