module.exports = UsersService;

var User = require('../../models/user');
var Q = require('q');

function UsersService() {
    var self = this;
    self.get = get;
    self.getSingle = getSingle;
    self.deleteUser = deleteUser;
    self.update = update;
    self.rate = rate;

    function get() {
        var defer = Q.defer();
        User.find(function (err, users) {
            if(err) defer.reject(err);
            defer.resolve(users);
        });
        return defer.promise;
    }

    function getSingle(id) {
        var defer = Q.defer();
        User.findById(id, function (err, user) {
            if(err) defer.reject(err);
            defer.resolve(user);
        });
        return defer.promise;
    }

    function deleteUser(id) {
        var defer = Q.defer();
        User.findByIdAndRemove(id, function (err, user) {
            if(err) defer.reject(err);
            defer.resolve(user);
        });
        return defer.promise;
    }

    function update(id, partial) {
        var defer = Q.defer();
        User.findByIdAndUpdate(id, {local: partial}, function (err, user) {
            if(err) defer.reject(err);
            defer.resolve(user);
        });
        return defer.promise;
    }

    function rate(id, rating) {
        return getSingle(id).then(function(user){
            var userRate = user._doc.local.rating;
            userRate.total += rating;
            userRate.count++;
            userRate.rate = userRate.total / userRate.count;
            return update(id, {
                rating: userRate
            });
        });
    }
}