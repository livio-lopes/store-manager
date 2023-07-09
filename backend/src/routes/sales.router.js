const express = require('express');
const salesController = require('../controllers/sales.controller');
const saleProductId = require('../middlewares/saleProductId');
const saleQuantity = require('../middlewares/saleQuantity');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSalesById);
router.post('/', saleProductId, saleQuantity, salesController.registerSales);

module.exports = router;