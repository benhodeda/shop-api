var facebook = require('./facebook/facebook.routes');
var twitter = require('./twitter/twitter.routes');
var google = require('./google/google.routes');
var authService = require('./auth.service');
var local = require('./local/local.routes');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var saveSession = {
    session: true,
    usernameField: 'email',
    passwordField: 'id',
    passReqToCallback: false
};

router.get('/logout', function (req, res) {
    req.logout();
    res.json({
        ok: 200
    });
});

router.use('/facebook', facebook);
router.use('/twitter', twitter);
router.use('/google', google);
router.use('/local', local);

router.post('/', passport.authenticate('auth', saveSession), authService.responseUser);

module.exports = router;