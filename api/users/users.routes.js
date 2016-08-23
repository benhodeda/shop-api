var UsersController = require('./users.controller');
var controller = new UsersController();
var express = require('express');
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

router.put('/:id', function(req, res, next){
    var id = req.params.id;
    var partial = req.body;
    controller.updateUser(id, partial).then(function (result) {
        res.json(result);
    });
});

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    controller.deleteUser(id).then(function (result) {
        res.json(result);
    });
});

module.exports = router;