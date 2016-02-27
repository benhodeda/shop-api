var controller = require('./local.controller');
var authService = require('../auth.service');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var saveSession = {session: true};

//local login
router.post('/login', passport.authenticate('local-login', saveSession), authService.responseUser);

//local signup
router.post('/signup', passport.authenticate('local-signup', saveSession), authService.responseUser);

router.post('/connect', passport.authenticate('local-signup', saveSession), authService.responseUser);

router.get('/unlink', unlink);

function unlink(req, res, next) {
    var user = req.user;
    controller.unlink(user).then(function (err) {
        if (err) {
            next(err);
        } else {
            res.json({ok: 200});
        }
    });
}

module.exports = router;