module.exports = UsersService;

var User = require('../../models/user');
var Q = require('q');

function UsersService() {
    var self = this;

    self.deleteUser = deleteUser;
    self.getSingle = getSingle;
    self.update = update;
    self.rate = rate;
    self.get = get;

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
        User.findByFid(id, function (err, user) {
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
        User.findOneAndUpdate({"local.id" :id }, {local: partial}, function (err, user) {
            if(err) defer.reject(err);
            defer.resolve(user);
        });
        return defer.promise;
    }

    function rate(id, rating, rater) {
        return getSingle(id).then(function(user){
            var user = user._doc.local;
            if (user.rating.raters.indexOf(rater) != -1 || user.id === rater) throw user.id;
            user.rating.total += rating;
            user.rating.raters.push(rater);
            user.rating.rate = user.rating.total / user.rating.raters.length;
            return update(id, user);
        });
    }
}