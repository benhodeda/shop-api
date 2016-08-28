var UsersController = require('./users.controller');
var express = require('express');

var controller = new UsersController();
var router = express.Router();

router.get('/', function(req, res, next){
    controller.getUsers().then(function (result) {
        res.json(result);
    });
});

router.get('/:id', function(req, res, next){
    var id = req.params.id;
    controller.getUser(id).then(function (result) {
        res.json(result);
    }).catch(function(err){
        res.json(err);
    });
});

router.post('/:id/rate', function (req, res, next) {
    var id = req.params.id;
    var rater = req.body;
    var rate = Number(req.query.rate);
    controller.rate(id, rate, rater.id).then(function (result) {
        res.json(result);
    }).catch(function(ratedId) {
        var message;
        if(ratedId === rater.id) message = "user can't rate themselves";
        else message = rater.name + " already rate this user";
        res.status(401).json({
            message:  message,
            rater: rater
        });
    });
});

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    controller.deleteUser(id).then(function (result) {
        res.json(result);
    });
});

router.put('/:id', function(req, res, next){
    var id = req.params.id;
    var partial = req.body;
    controller.updateUser(id, partial).then(function (result) {
        res.json(result);
    });
});

module.exports = router;