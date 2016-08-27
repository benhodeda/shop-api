var ProductsController = require('./products.controller');
var upload = require('./upload.service');
var express = require('express');

var controller = new ProductsController();
var router = express.Router();

router.get('/search', function(req, res, next){
    var q = req.query.q;
    var filters = req.query;
    delete filters.q;
    for(var filter in filters){
        if(filter.toLowerCase() == 'ignore') delete filters[filter];
        else filters[filter] = filters[filter].split(",");
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
        if(filter.toLowerCase() == 'ignore') delete filters[filter];
        else filters[filter] = filters[filter].split(",");
    }
    controller.getSoldProducts(q, filters).then(function(results){
        res.json(results);
    });
});

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    controller.getProduct(id).then(function(result){
        res.json(result);
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

router.post('/sold/:id', function (req, res, next) {
    var productId = req.params.id;
    var user = req.body;
    controller.confirmPurchase(productId, user).then(function(result){
        res.json(result);
    });
});

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    controller.deleteProduct(id).then(function(result){
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

module.exports = router;