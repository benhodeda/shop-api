module.exports = ProductsController;

var ProductsService = require('./products.service');
var send = require('./emails.service');

var service = new ProductsService();

function ProductsController() {
    var self = this;

    self.confirmPurchase = confirmPurchase;
    self.getSoldProducts = getSoldProducts;
    self.deleteProduct = deleteProduct;
    self.createProduct = createProduct;
    self.updateProduct = updateProduct;
    self.getProducts = getProducts;
    self.getProduct = getProduct;


    function getProducts(query, filters) {
        return service.getProducts(query, filters);
    }
    function getSoldProducts(query, filters) {
        return service.getSoldProducts(query, filters);
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
        return service.updateProduct(productId, partial).then(function(){
            return service.getProduct(productId).then(function(product){
                return send(product.seller, product, product.buyer).then(function(result){
                    result.product = product;
                    return result;
                })
            });
        });
    }
}