module.exports = initializeLocal;

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var emailStrategy = {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
};

function initializeLocal(passport) {

    passport.use('auth', new LocalStrategy(emailStrategy,
        function (req, email, password, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user) {
                        //  If we're logged in, we're connecting a new local account.
                        if (req.user) {
                            insertUser(req.user, email, password, done);
                        }
                        //  We're not logged in, so we're creating a brand new user.
                        else {
                            // create the user
                            insertUser(new User(), email, password, done);
                        }
                    }
                    if (!user.validPassword(password))
                        return done(null, false, {message: 'Oops! Wrong password.'});

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });
        }));

    passport.use('local-login', new LocalStrategy(emailStrategy,
        function (req, email, password, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user) {
                        return done(null, false, {message: 'No user found.'});
                    }
                    if (!user.validPassword(password))
                        return done(null, false, {message: 'Oops! Wrong password.'});

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });
        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy(emailStrategy,
        function (req, email, password, done) {
            // asynchronous
            process.nextTick(function () {

                //  Whether we're signing up or connecting an account, we'll need
                //  to know if the email address is in use.
                User.findOne({'local.email': email},

                    function (err, existingUser) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if there's already a user with that email
                        if (existingUser)
                            return done(null, false, {message: 'That email is already taken.'});

                        //  If we're logged in, we're connecting a new local account.
                        if (req.user) {
                            insertUser(req.user, email, password, done);
                        }
                        //  We're not logged in, so we're creating a brand new user.
                        else {
                            // create the user
                            insertUser(new User(), email, password, done);
                        }

                    });
            });
        }));
}

function insertUser(user, email, password, done) {
    user.local.email = email;
    user.local.password = user.generateHash(password);
    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
}