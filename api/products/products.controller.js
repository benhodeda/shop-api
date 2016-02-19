module.exports = ProductsController;
var ProductsService = require('./products.service');
var service = new ProductsService();

function ProductsController(){
    var self = this;

    self.getProducts = getProducts;
    self.getCategories = getCategories;
    self.createProduct = createProduct;

    function getProducts(query, filters){
        return service.getProducts(query, filters);
    }

    function getCategories(){
        return service.getCategories();
    }

    function createProduct(product){
        return service.index(product);
    }
}