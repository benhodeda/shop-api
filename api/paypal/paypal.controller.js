module.exports = PayPalController;

// var paypal = require('paypal-rest-sdk');
// var config = require('./config.json');
var Paypal = require('paypal-adaptive');
var ProductsService = require('../products/products.service');
var products = new ProductsService();


var Q = require('q');

var paypalSdk = new Paypal({
    userId:    'benhodeda-facilitator_api1.gmail.com',
    password:  'KTQNRF6DZNUZN7DR',
    signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31AgmkuMGQzQRxJ1-F.aPTMkW7rTnk',
    sandbox:   true //defaults to false
});

function PayPalController() {
    var self = this;

    self.pay = pay;

    function pay(productId, cancelUrl, returnUrl){
        return products.getProduct(productId).then(function(product){
            var percent = product.percent / 100;
            var organizationAmount = product.price * percent;
            var sellerAmount = product.price - organizationAmount;

            var payload = {
                requestEnvelope: {
                    errorLanguage:  'en_US'
                },
                actionType:     'PAY',
                currencyCode:   'ILS',
                feesPayer:      'EACHRECEIVER',
                cancelUrl:      cancelUrl,
                returnUrl:      returnUrl,
                receiverList: {
                    receiver: [
                        {
                            email:  product.seller,
                            amount: sellerAmount
                        },
                        {
                            email:  product.organization.email,
                            amount: organizationAmount
                        }
                    ]
                }
            };

            var deffer = Q.defer();
            paypalSdk.pay(payload, function (err, response) {
                if (err) {
                    deffer.reject(err);
                } else {
                    deffer.resolve(response);
                }
            });
            return deffer.promise;
        });
    }
}