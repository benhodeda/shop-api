module.exports = initializeLocal;

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var UserService = require('../api/users/users.service');

var userService = new UserService();

var emailStrategy = {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'id',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
};

function initializeLocal(passport) {

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
                        insertUser(req.body, done);
                    }
                    // all is well, return user
                    else
                        updateUser(req.body, done);
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
                            return done(null, req.user);
                        }
                        //  We're not logged in, so we're creating a brand new user.
                        else {
                            // create the user
                            insertUser(req.body, done);
                        }

                    });
            });
        }));
}

function insertUser(user, done) {
    var newUser = new User();
    newUser.local = user;
    newUser.local.rating = {
        total: 0,
        rate: 0,
        raters: []
    };
    newUser.save(function (err) {
        if (err)
            throw err;
        return done(null, newUser);
    });
}

function updateUser(user, done) {
    User.findOneAndUpdate({"local.id": user.id }, {"local.picture": user.picture}, function (err, user) {
        if (err)
            throw err;
        return done(null, user);
    });
    
}