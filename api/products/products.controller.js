module.exports = ProductsController;
var ProductsService = require('./products.service');
var service = new ProductsService();

function ProductsController(){
    var self = this;

    self.list = listProducts;

    function listProducts(){
        return service.getAllProducts();
    }
}