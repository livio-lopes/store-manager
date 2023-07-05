const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id');

module.exports = router;