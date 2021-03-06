module.exports = UsersController;

var UsersService = require('./users.service');
var ProductsService = require('../products/products.service');

var service = new UsersService();
var productsService = new ProductsService();

function UsersController() {
    var self = this;

    self.updateUser = updateUser;
    self.deleteUser = deleteUser;
    self.getUsers = getUsers;
    self.getUser = getUser;
    self.rate = rate;


    function getUsers() {
        return service.get();
    }
    
    function getUser(id) {
        return service.getSingle(id);
    }
    
    function deleteUser(id) {
        return service.deleteUser(id);
    }
    
    function updateUser(id, partial) {
        return service.update(id, partial).then(function(result){
            var partial = result._doc.local;
            return productsService.updateUserProducts(id, {seller: partial}).then(function(){
                return result;
            })
        });
    }
    
    function rate(id, rating, rater) {
        return service.rate(id, rating, rater).then(function(result){
            var partial = result._doc.local;
            return productsService.updateUserProducts(id, {seller: partial}).then(function(){
                return result;
            })
        });
    }
}