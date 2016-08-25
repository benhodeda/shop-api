module.exports = ProductsController;
var ProductsService = require('./products.service');
var uploadService = require('./upload.service');
var send = require('./emails.service');

var Q = require('q');
var uuid = require('uuid');
var service = new ProductsService();

function ProductsController() {
    var self = this;

    self.getProduct = getProduct;
    self.getProducts = getProducts;
    self.getSoldProducts = getSoldProducts;
    self.getCategories = getCategories;
    self.createProduct = createProduct;
    self.updateProduct = updateProduct;
    self.deleteProduct = deleteProduct;
    self.confirmPurchase = confirmPurchase;


    function getProducts(query, filters) {
        return service.getProducts(query, filters);
    }
    function getSoldProducts(query, filters) {
        return service.getSoldProducts(query, filters);
    }

    function getCategories() {
        return service.getCategories();
    }

    function createProduct(product) {
        return service.index(product);
    }

    function deleteProduct(id) {
        return service.deleteProduct(id);
    }

    function getProduct(id){
        return service.getProduct(id);
    }

    function updateProduct(id, partial) {
        return service.updateProduct(id, partial);
    }
    
    function confirmPurchase(productId, user) {
        var partial = {
            buyer: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            sold: true
        };
        return service.updateProduct(productId, partial).then(function(product){
            return send(product.seller, product, product.buyer).then(function(result){
                result.product = product;
                return result;
            });
        });
    }
}