var ProductsController = require('./products.controller');
var controller = new ProductsController();
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    controller.list().then(function(results){
        res.json(results);
    })
});

module.exports = router;