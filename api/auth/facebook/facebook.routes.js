var controller = require('./facebook.controller');
var authService = require('../auth.service');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var saveSession = {
    session: true,
    passReqToCallback: true,
    scope: ['public_profile', 'email', 'user_about_me', 'user_birthday']
};

// route for facebook authentication and login
router.get('/', passport.authenticate('facebook', saveSession));

// handle the callback after facebook has authenticated the user
router.get('/callback', passport.authenticate('facebook', saveSession), authService.responseUser);

router.get('/connect', passport.authorize('facebook', saveSession));

// handle the callback after facebook has authorized the user
router.get('/connect/callback', passport.authorize('facebook', saveSession), authService.responseUser);

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