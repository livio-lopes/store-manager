const express = require('express');
const routerProducts = require('./routerProducts');

const router = express.Router();

router.use('/product', routerProducts);