module.exports = PayPalController;

// var paypal = require('paypal-rest-sdk');
// var config = require('./config.json');
var Paypal = require('paypal-adaptive');
var Logs = require('../products/products.service');
var logs = new Logs();

var paypalSdk = new Paypal({
    userId:    '489766946',
    password:  'KTQNRF6DZNUZN7DR',
    signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31AgmkuMGQzQRxJ1-F.aPTMkW7rTnk',
    sandbox:   true //defaults to false
});

function PayPalController() {
    var self = this;

    self.preapproval = preapproval;

    function preapproval(){
        var payload = {
            requestEnvelope: {
                errorLanguage:  'en_US'
            },
            actionType:     'PAY',
            currencyCode:   'USD',
            feesPayer:      'EACHRECEIVER',
            memo:           'Chained payment example',
            cancelUrl:      'http://localhost:3000/?x=cancel',
            returnUrl:      'http://localhost:3000/?x=success',
            receiverList: {
                receiver: [
                    {
                        email:  'eladdo@gmail.com',
                        amount: '100.00',
                        primary:'true'
                    },
                    {
                        email:  'benhodeda@gmail.com',
                        amount: '10.00',
                        primary:'false'
                    }
                ]
            }
        };

        paypalSdk.preapproval(payload, function (err, response) {
            if (err) {
                logs.index(err);
            } else {
                logs.index(response);
            }
        });
    }

    // self.init = init;
    // self.create = create;
    // self.execute = execute;

    // function init(){
    //     paypal.configure(config.api);
    // }
    //
    // function create (method, currency, amount, description, card) {
    //     var payment = {
    //         "intent": "sale",
    //         "payer": {
    //         },
    //         "transactions": [{
    //             "amount": {
    //                 "currency": currency,
    //                 "total": amount
    //             },
    //             "description": description
    //         }]
    //     };
    //
    //     if (method === 'paypal') {
    //         payment.payer.payment_method = 'paypal';
    //         payment.redirect_urls = {
    //             "return_url": "https://mta-shopapi.herokuapp.com/api/paypal/execute",
    //             "cancel_url": "https://mta-shopapi.herokuapp.com/api/paypal/cancel"
    //         };
    //     } else if (method === 'credit_card') {
    //         var funding_instruments = [
    //             {
    //                 "credit_card": {
    //                     "type": card.type,
    //                     "number": card.number,
    //                     "expire_month": card.expire_month,
    //                     "expire_year": card.expire_year,
    //                     "first_name": card.first_name,
    //                     "last_name": card.last_name
    //                 }
    //             }
    //         ];
    //         payment.payer.payment_method = 'credit_card';
    //         payment.payer.funding_instruments = funding_instruments;
    //     }
    //
    //     return paypal.payment.create(payment, function (error, payment) {
    //         if (error) {
    //             throw error;
    //         } else {
    //             return { 'payment': payment };
    //         }
    //     });
    // }
    //
    // function execute(paymentId, payerId) {
    //     var details = { "payer_id": payerId };
    //     return paypal.payment.execute(paymentId, details, function (error, payment) {
    //         if (error) {
    //             throw error;
    //         } else {
    //             return { 'payment': payment };
    //         }
    //     });
    // }
}