var controller = require('./twitter.controller');
var authService = require('../auth.service');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var saveSession = {
    session: true,
    passReqToCallback: true,
    scope: 'email'
};

// route for twitter authentication and login
router.get('/', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/callback', passport.authenticate('twitter', saveSession), authService.responseUser);

router.get('/connect', passport.authorize('twitter', saveSession));

// handle the callback after twitter has authorized the user
router.get('/connect/callback', passport.authorize('twitter', saveSession), authService.responseUser);

router.get('/unlink', unlink);

function unlink(req, res) {
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