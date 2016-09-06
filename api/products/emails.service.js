module.exports = sendEmails;

var nodemailer = require('nodemailer');
var moment = require('moment');
var Q = require('q');

moment.locale('he');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hand2hand.desk@gmail.com', // Your email id
        pass: 'AA123456aa' // Your password
    }
});

var sellerOptions = {
    subject: "מוצרך נרכש!",
    callback: generateSellerEmailContent
};

var buyerOptions = {
    subject: "הרכישה התבצעה בהצלחה!",
    callback: generateBuyerEmailContent
};

var emailOptionsBase = {
    from: 'Hand2Hand <benhodedea@gmail.com>'
};

function generateEmeailOptions(emailOptions, sellerName, product, buyerName) {
    return {
        from: 'Hand2Hand <benhodedea@gmail.com>', // sender address
        to: 'eladdo92@gmail.com', // list of receivers
        subject: emailOptions.subject, // Subject line
        html: emailOptions.callback(sellerName, product, buyerName) //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
}

function generateSellerEmailContent(sellerName, product, buyerName) {
    return "שלום " + sellerName + "<br />" +
            "הפריט בשם: " + product.description + " נרכש ע\"י " + buyerName + "<br />" +
        "ביום " + moment().format('LLLL') + "<br />" +
        "תודה על תרומתך,"  + "<br />" +
        "Hand2Hand"  + "<br />" +
        "<img src='http://mta-shopapi.herokuapp.com/assets/img/logo.png' width='140' height='90' />";
}

function generateBuyerEmailContent(sellerName, product, buyerName) {
    return "שלום " + buyerName + "<br />" +
        "תודה שבחרת לרכוש את הפריט: " + product.description + ", אשר נמכר ע\"י " + sellerName +"<br />" +
        "ביום " + moment().format('LLLL') + "<br />" +
        "תודה על תרומתך,"  + "<br />" +
        "Hand2Hand"  + "<br />" +
        "<img src='http://mta-shopapi.herokuapp.com/assets/img/logo.png' width='140' height='90' />";
}

function getSellerOptions(seller, product, buyer){
    var emailOptions = emailOptionsBase;
    emailOptions.to = seller.email;
    emailOptions.subject = sellerOptions.subject;
    emailOptions.html = sellerOptions.callback(seller.name,product, buyer.name);
    return emailOptions;
}

function getBuyerOptions(seller, product, buyer){
    var emailOptions = emailOptionsBase;
    emailOptions.to = buyer.email;
    emailOptions.subject = buyerOptions.subject;
    emailOptions.html = buyerOptions.callback(seller.name,product, buyer.name);
    return emailOptions;
}

function sendEmails(seller, product, buyer) {
    var defer = Q.defer();
    transporter.sendMail(getSellerOptions(seller, product, buyer), function(error, info){
        var final = {};
        final.seller = error || info.response;
        transporter.sendMail(getBuyerOptions(seller, product, buyer), function(error, info){
            final.buyer = error || info.response;
            defer.resolve(final);
        });
    });
    return defer.promise;
}