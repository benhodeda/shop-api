var products = require('./products/products.routes');
var auth = require('./auth/auth.routes');
var express = require('express');
var router = express.Router();

router.use('/products', products);
router.use('/auth', auth);

module.exports = router;