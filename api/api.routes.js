var products = require('./products/products.routes');
var paypal = require('./paypal/paypal.routes');
var auth = require('./auth/auth.routes');
var express = require('express');
var router = express.Router();

router.use('/products', products);
router.use('/paypal', paypal);
router.use('/auth', auth);

module.exports = router;