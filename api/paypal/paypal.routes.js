var PayPalController = require('./paypal.controller');
var controller = new PayPalController();
var express = require('express');
var router = express.Router();

router.get('/create', function(req, res, next) {
    var method = req.param('method');
    var currency = req.param('currency');
    var amount = req.param('amount');
    var description = req.param('description');
    var card = {
        type: req.param('type').toLowerCase(),
        number: req.param('number'),
        expire_month: req.param('expire_month'),
        expire_year: req.param('expire_year'),
        first_name: req.param('first_name'),
        last_name: req.param('last_name')
    };
    return controller.create(method,currency,amount,description,card).then(function(payment){
        req.session.paymentId = payment.id;
        return payment;
    })
});

router.get('/execute', function (req,res,next){
    var paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');
    return controller.execute(paymentId, payerId);
});


router.get('/cancel', function (req,res,next){
    res.status()
});

module.exports = router;