module.exports = {
    index: index
};
var ProductsService = require('../api/products/products.service');
var service = new ProductsService();
var seeds = require('./seeds.json');

function index() {
    seeds.forEach(function(seed){
        service.index(seed);
    });
}