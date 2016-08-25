var ProductsController = require('./products.controller');
var controller = new ProductsController();
var express = require('express');
var router = express.Router();
var upload = require('./upload.service');

router.get('/categories', function(req, res, next){
   controller.getCategories().then(function(results){
       res.json(results);
   });
});

router.get('/search', function(req, res, next){
    var q = req.query.q;
    var filters = req.query;
    delete filters.q;
    for(var filter in filters){
        if(filter.toLowerCase() == 'ignore') continue;
        filters[filter] = filters[filter].split(",");
    }
    controller.getProducts(q, filters).then(function(results){
        res.json(results);
    });
});

router.get('/sold', function(req, res, next){
    var q = req.query.q;
    var filters = req.query;
    delete filters.q;
    for(var filter in filters){
        if(filter.toLowerCase() == 'ignore') continue;
        filters[filter] = filters[filter].split(",");
    }
    controller.getSoldProducts(q, filters).then(function(results){
        res.json(results);
    });
});

router.post('/', function(req, res, next){
    var product = req.body;
    controller.createProduct(product).then(function(result){
        res.json(result);
    });
});

router.post('/upload', upload, function(req, res, next){
    controller.createProduct({ image: req.file.fieldname}).then(function(result){
        res.json(result);
    });
});

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    controller.deleteProduct(id).then(function(result){
        res.json(result);
    });
});

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    controller.getProduct(id).then(function(result){
        res.json(result);
    });
});

router.put('/:id', function(req, res, next){
    var id = req.params.id;
    var partial = req.body;
    controller.updateProduct(id, partial).then(function(result){
        res.json(result);
    });
});

router.post('/sold/:id', function (req, res, next) {
    var productId = req.params.id;
    var user = req.body;
    controller.confirmPurchase(productId, user).then(function(result){
        res.json(result);
    });
});

module.exports = router;