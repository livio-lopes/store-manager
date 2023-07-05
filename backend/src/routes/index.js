const express = require('express');
const routerProducts = require('./products.router');
const routerSales = require('./sales.router');

const router = express.Router();

router.use('/products', routerProducts);
router.use('/sales', routerSales);

module.exports = router;