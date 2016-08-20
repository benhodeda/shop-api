module.exports = ProductsController;
var ProductsService = require('./products.service');
var uploadService = require('./upload.service');

var Q = require('q');
var uuid = require('uuid');
var service = new ProductsService();

function ProductsController() {
    var self = this;

    self.upload = upload;
    self.getProduct = getProduct;
    self.getProducts = getProducts;
    self.getSoldProducts = getSoldProducts;
    self.getCategories = getCategories;
    self.createProduct = createProduct;
    self.updateProduct = updateProduct;
    self.deleteProduct = deleteProduct;

    function upload(request, response) {
        var deffer = Q.defer();
        request.file.fieldname = uuid.v1();
        uploadService(request, response, function(err){
            if(err) deffer.reject(err);
            else return createProduct({ image: request.file.fieldname });
        });

        return deffer.promise;
    }

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