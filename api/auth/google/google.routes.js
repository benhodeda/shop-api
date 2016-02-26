var controller = require('./google.controller');
var authService = require('../auth.service');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var saveSession = {
    session: true,
    scope: ['profile', 'email']
};

// send to google to do the authentication
router.get('/', passport.authenticate('google', saveSession));

// the callback after google has authenticated the user
router.get('/callback',
    passport.authenticate('google', saveSession), authService.responseUser);

router.get('/connect', passport.authorize('google', saveSession));

// the callback after google has authorized the user
router.get('/connect/callback', passport.authorize('google', saveSession), authService.responseUser);

router.get('/unlink', function (req, res) {
    var user = req.user;
    controller.unlink(user).then(function (err) {
        if (err) {
            next(err);
        } else {
            res.json({ok: 200});
        }
    });
});

module.exports = router;