var products = require('./products/products.routes');
var express = require('express');
var router = express.Router();

router.use('/products', products);

module.exports = router;