module.exports = UsersController;

var UsersService = require('./users.service');

var service = new UsersService();

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
        return service.update(id, partial);
    }
    
    function rate(id, rating, rater) {
        return service.rate(id, rating, rater);
    }
}