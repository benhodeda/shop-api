module.exports = initializeGoogle;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var service = require('./passport.service');
var config = require('../config');

function initializeGoogle(passport) {
    passport.use(new GoogleStrategy(config.authentication.google, service.generateStrategyCallback('google.id', insertUser, 'google')));
}

function insertUser(user, token, profile, extractId) {
    if (extractId)
        user.google.id = profile.id;
    user.google.token = token;
    user.google.name = profile.displayName;
    user.google.email = profile.emails[0].value;
    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
}