const express = require('express');
const salesController = require('../controllers/sales.controller');
const saleProductId = require('../middlewares/saleProductId');
const saleQuantity = require('../middlewares/saleQuantity');
const updateQuantity = require('../middlewares/updateQuantity');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSalesById);
router.post('/', saleProductId, saleQuantity, salesController.registerSales);
router.put('/:saleId/products/:productId/quantity', updateQuantity, salesController.updateQuantity);
router.delete('/:id', salesController.deleteSalesById);

module.exports = router;