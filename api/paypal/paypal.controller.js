module.exports = PayPalController;

var paypal = require('paypal-rest-sdk');
var config = require('./config.json');
var ProductsService = require('./products.service');
var service = new ProductsService();

function PayPalController() {
    var self = this;

    self.init = init;
    self.create = create;
    self.execute = execute;

    function init(){
        paypal.configure(config.api);
    }

    function create (method, currency, amount, description, card) {
        var payment = {
            "intent": "sale",
            "payer": {
            },
            "transactions": [{
                "amount": {
                    "currency": currency,
                    "total": amount
                },
                "description": description
            }]
        };

        if (method === 'paypal') {
            payment.payer.payment_method = 'paypal';
            payment.redirect_urls = {
                "return_url": "https://mta-shopapi.herokuapp.com/api/paypal/execute",
                "cancel_url": "https://mta-shopapi.herokuapp.com/api/paypal/cancel"
            };
        } else if (method === 'credit_card') {
            var funding_instruments = [
                {
                    "credit_card": {
                        "type": card.type,
                        "number": card.number,
                        "expire_month": card.expire_month,
                        "expire_year": card.expire_year,
                        "first_name": card.first_name,
                        "last_name": card.last_name
                    }
                }
            ];
            payment.payer.payment_method = 'credit_card';
            payment.payer.funding_instruments = funding_instruments;
        }

        return paypal.payment.create(payment, function (error, payment) {
            if (error) {
                throw error;
            } else {
                return { 'payment': payment };
            }
        });
    }

    function execute(paymentId, payerId) {
        var details = { "payer_id": payerId };
        return paypal.payment.execute(paymentId, details, function (error, payment) {
            if (error) {
                throw error;
            } else {
                return { 'payment': payment };
            }
        });
    }
}