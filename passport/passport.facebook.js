module.exports = initializeFacebook;

var FacebookStrategy = require('passport-facebook').Strategy;
var service = require('./passport.service');
var config = require('../config');

function initializeFacebook(passport) {
    passport.use(new FacebookStrategy(config.authentication.facebook, service.generateStrategyCallback('facebook.id', insertUser, 'facebook')));
}

function insertUser(user, token, profile, extractId) {
    if(extractId) user.facebook.id = profile.id; // set the users facebook id
    user.facebook.token = token;
    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
    user.facebook.email = profile.emails[0].value;
    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
}