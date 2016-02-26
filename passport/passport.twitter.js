module.exports = initializeTwitter;

var TwitterStrategy = require('passport-twitter').Strategy;
var service = require('./passport.service');
var config = require('../config');

function initializeTwitter(passport) {
    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy(config.authentication.twitter, service.generateStrategyCallback('twitter.id', insertUser, 'twitter')));
}

function insertUser(user, token, profile, extractId) {
    if (extractId)
        user.twitter.id = profile.id;
    user.twitter.token = token;
    user.twitter.username = profile.username;
    user.twitter.displayName = profile.displayName;
    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
}