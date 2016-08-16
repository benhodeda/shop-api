module.exports = ProductsController;
var ProductsService = require('./products.service');
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
}