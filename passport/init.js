module.exports = initialize;

var User = require('../models/user');
var initializeLocal = require('./passport.local');
var initializeGoogle = require('./passport.google');
var initializeTwitter = require('./passport.twitter');
var initializeFacebook = require('./passport.facebook');

function initialize(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    initializeLocal(passport);

    initializeFacebook(passport);

    initializeTwitter(passport);

    initializeGoogle(passport);
}
